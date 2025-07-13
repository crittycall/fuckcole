import { rotateSmoothly, doJump, leftClick, sendMsg, setSneakKey, C02PacketUseEntity } from "../../utils/utils";
import serverRotations from "../../utils/serverRotations";
import config from "../../config";
import { Keybind } from "../../../tska/shared/Keybind";

/**
 * No im not fixing this crit this is too schizo
 * atp just call it auto ban me idk
 */

const processedCommands = new Set();
let clearTimeout = null;

const cancelPacket = register("packetSent", (packet, event) => cancel(event)).setFilteredClass(C02PacketUseEntity).unregister();

register("packetReceived", (packet, event) => {
  if (!config.toggleImpel) return;

  const message = ChatLib.removeFormatting(packet.func_179805_b()?.func_150260_c());

  if (!message.startsWith("Impel:")) return;
  if (clearTimeout) clearTimeout.cancel();

  clearTimeout = setTimeout(() => {
    processedCommands.clear();
    clearTimeout = null;
  }, 1000);

  const commandPart = message.split(" ").slice(0, 2).join(" ");
  if (processedCommands.has(commandPart)) return;
  processedCommands.add(commandPart);

  if (message.startsWith("Impel: CLICK UP")) {
    if (config.noRotate) {
      impelDontRotate(Player.getYaw(), -90);
    } else {
      impelDoRotate(Player.getYaw(), -90);
    }
  } else if (message.startsWith("Impel: CLICK DOWN")) {
    if (config.noRotate) {
      impelDontRotate(Player.getYaw(), 90);
    } else {
      impelDoRotate(Player.getYaw(), 90);
    }
  } else if (message.startsWith("Impel: SNEAK")) {
    sendMsg("§bAutoimpel: §l§cstarted"); // why
    setSneakKey(true);
    setTimeout(() => setSneakKey(false), 50);
    sendMsg("§bAutoimpel: §l§acomplete"); // debug
  } else if (message.startsWith("Impel: JUMP")) {
    sendMsg("§bAutoimpel: §l§cstarted"); // here
    doJump();
    sendMsg("§bAutoimpel: §l§acomplete"); // omg
  }
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S45PacketTitle"));

function impelDoRotate(yaw, pitch) {
  let oldpitch = Player.getPitch();
  sendMsg("§bAutoimpel: §l§cstarted"); // debug
  rotateSmoothly(yaw, pitch, 100);
  setTimeout(() => {
    leftClick();
    rotateSmoothly(Player.getYaw(), oldpitch, 50);
  }, 100);
  sendMsg("§bAutoimpel: §l§acomplete"); // again
}

function impelDontRotate(yaw, pitch) {
  serverRotations.setRotation(yaw, pitch, () => {
    sendMsg("§bAutoimpel: §l§cstarted"); // pls
    cancelPacket.register();
    leftClick();

    Client.scheduleTask(0, () => {
      serverRotations.resetRotation();
      sendMsg("§bAutoimpel: §l§acomplete"); // kms
      cancelPacket.unregister();
    });
  });
}

//new Keybind("impelrotate", Keyboard.KEY_NONE, "impelrotate").registerKeyPress(() => impelDoRotate(Player.getYaw(), -90));
//new Keybind("impeldontrotate", Keyboard.KEY_NONE, "impeldontrotate").registerKeyPress(() => impelDontRotate(Player.getYaw(), -90));