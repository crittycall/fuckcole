import {
  rotateSmoothly,
  doJump,
  leftClick,
  sendMsg,
  setSneakKey,
  C07PacketPlayerDigging,
  sendDebugMsg,
  DIGGER,
} from "../../../utils/utils";
import { C02PacketUseEntity } from "../../../../BloomCore/utils/Utils";
import serverRotations from "../../../utils/serverRotations";
import config from "../../../config";

/**
 * No im not fixing this crit this is too schizo
 * atp just call it auto ban me idk
 */

// Set timeout inbetween impels, makes it so ping doesn't touch u and causes you to do impel multiple times. //
const processedCommands = new Set();
let clearTimeout = null;

// Gets the block below the player; used for impel: click down since it looks for dig packet instead of click packet. //
const blockBelow = [
  Math.floor(Player.getX()),
  Math.floor(Player.getY() - 0.1),
  Math.floor(Player.getZ()),
];
/**
 * Cancels packets
 * Cancel hit packet so that anticheat doesn't think that you are killauraing.
 * Cancels dig packet so that you dont send an incorrect vector to the server (auraing the ground lol)
 */
const cancelHitPacket = register("packetSent", (packet, event) => cancel(event))
  .setFilteredClass(C02PacketUseEntity)
  .unregister();
const cancelDigPacket = register("packetSent", (packet, event) => cancel(event))
  .setFilteredClass(C07PacketPlayerDigging)
  .unregister();

// Cancels one of the aforementioned packets. //
function cancelPacket(packet, duration = 10) {
  packet.register();
  sendDebugMsg(`did ${packet}`);
  Client.scheduleTask(duration, () => {
    packet.unregister();
    sendDebugMsg(`undid ${packet}`);
  });
}
/**
 * impelDoRotate = uses client rotatiions
 * impelDontRotate = uses server rotations
 */
function impelDoRotate(yaw, pitch) {
  let oldpitch = Player.getPitch();
  rotateSmoothly(yaw, pitch, config.impelSpeedIn);
  setTimeout(() => {
    leftClick();
    rotateSmoothly(Player.getYaw(), oldpitch, config.impelSpeedOut);
  }, config.impelSpeedIn - 10);
  sendDebugMsg("§bAutoimpel: §l§acomplete");
}

function impelDontRotate(yaw, pitch, dig = false) {
  serverRotations.setRotation(yaw, pitch, () => {
    cancelHitPacket.register();
    sendDebugMsg("registered cancel hit packet");
    leftClick();
    if (dig == true) DIGGER(blockBelow[0], blockBelow[1], blockBelow[2]);
    Client.scheduleTask(0, () => {
      serverRotations.resetRotation();
      sendDebugMsg("§bAutoimpel: §l§acomplete");
      cancelHitPacket.unregister();
      sendDebugMsg("unregistered cancel hit packet");
    });
  });
}

// Does click impel based on case (abstracted) //
function clickImpel(direction) {
  if (!config.noRotate) {
    switch (direction) {
      case "up":
        impelDoRotate(Player.getYaw(), -90);
        break;
      case "down":
        impelDoRotate(Player.getYaw(), 90);
        break;
    }
  } else {
    switch (direction) {
      // Clicks up and cancels dig packet so no auraing the ground //
      case "up":
        impelDontRotate(Player.getYaw(), -90);
        cancelPacket(cancelDigPacket);
        break;
      // Clicks down and sends dig packet, dig packet is required for click down impel to complete. //
      case "down":
        impelDontRotate(Player.getYaw(), 90, true);
        sendDebugMsg("digged down fuck u");
        break;
    }
  }
}

// Does keybind impel based on case (sneak/jump) + (also abstracted) //
function keybindImpel(keybind) {
  switch (keybind) {
    // Sets your state to sneaking, completes sneak impel. //
    case "sneak":
      setSneakKey(true);
      setTimeout(() => setSneakKey(false), 50);
      sendDebugMsg("§bAutoimpel: §l§acomplete");
      break;
    // Sets your state to jumping, completes jump impel //
    case "jump":
      doJump();
      sendDebugMsg("§bAutoimpel: §l§acomplete");
      break;
  }
}

// Listens for title packet (packet required to figure out which impel u get) //
register("packetReceived", (packet, event) => {
  if (!config.toggleImpel) return;

  const message = ChatLib.removeFormatting(
    packet.func_179805_b()?.func_150260_c()
  );

  if (!message.startsWith("Impel:")) return;
  if (clearTimeout) clearTimeout.cancel();

  clearTimeout = setTimeout(() => {
    processedCommands.clear();
    clearTimeout = null;
  }, 1000);

  // Adds the impel which was recently completed to proccessed commands set. //
  const commandPart = message.split(" ").slice(0, 2).join(" ");
  if (processedCommands.has(commandPart)) return;
  processedCommands.add(commandPart);

  // Figures out which impel to complete //
  if (message.startsWith("Impel: CLICK UP")) {
    clickImpel("up");
  } else if (message.startsWith("Impel: CLICK DOWN")) {
    clickImpel("down");
  } else if (message.startsWith("Impel: SNEAK")) {
    keybindImpel("sneak");
  } else if (message.startsWith("Impel: JUMP")) {
    keybindImpel("jump");
  }
}).setFilteredClass(
  Java.type("net.minecraft.network.play.server.S45PacketTitle")
);

///// DEBUG /////
register("command", (pitch) => {
  if (pitch == "click_up") pitch = -90;
  if (pitch == "click_down") pitch = 90;
  if (config.debugmode) impelDoRotate(Player.getYaw(), pitch);
  else sendMsg("Debug mode not activated");
})
  .setName("testimpelrotate")
  .setTabCompletions("click_up", "click_down");

register("command", (pitch) => {
  if (pitch == "click_up") pitch = -90;
  if (pitch == "click_down") pitch = 90;
  if (config.debugmode) impelDontRotate(Player.getYaw(), pitch);
  else sendMsg("Debug mode not activated");
})
  .setName("testimpelnorotate")
  .setTabCompletions("click_up", "click_down");

register("command", () => {
  if (config.debugmode) cancelDigPacket.register();
  else sendMsg("Debug mode not activated");
}).setName("testdigpacket");

register("command", () => {
  DIGGER(blockBelow[0], blockBelow[1], blockBelow[2]);
}).setName("digger");

register("command", () => {
  cancelDigPacket.register();
}).setName("registerdigpacket");
