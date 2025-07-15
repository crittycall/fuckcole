import { rotateSmoothly, doJump, leftClick, sendMsg, setSneakKey, C02PacketUseEntity, C07PacketPlayerDigging, sendDebugMsg } from "../../utils/utils";
import serverRotations from "../../utils/serverRotations";
import config from "../../config";
import { Keybind } from "../../../tska/shared/Keybind";

/**
 * No im not fixing this crit this is too schizo
 * atp just call it auto ban me idk
 */

const processedCommands = new Set();
let clearTimeout = null;

const cancelHitPacket = register("packetSent", (packet, event) => cancel(event)).setFilteredClass(C02PacketUseEntity).unregister();
const cancelDigPacket = register("packetSent", (packet, event) => cancel(event)).setFilteredClass(C07PacketPlayerDigging).unregister();



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
      impelDontRotate(Player.getYaw(), -90,);
      cancelDigPacket.register();
      sendDebugMsg("registered cancel dig packet");
      Client.scheduleTask(10,() => {cancelDigPacket.unregister();
        sendDebugMsg("unregistered cancel dig packet")});
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
    setSneakKey(true);
    setTimeout(() => setSneakKey(false), 50);
    DebugImpel()
  } else if (message.startsWith("Impel: JUMP")) {
    doJump();
    DebugImpel()
  }
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S45PacketTitle"));

function impelDoRotate(yaw, pitch) {
  let oldpitch = Player.getPitch();
  rotateSmoothly(yaw, pitch, config.impelSpeedIn);
  setTimeout(() => {
    leftClick();
    rotateSmoothly(Player.getYaw(), oldpitch, config.impelSpeedOut);
  }, config.impelSpeedIn - 10);
  DebugImpel()
}

function impelDontRotate(yaw, pitch,) {
  serverRotations.setRotation(yaw, pitch, () => {
    cancelHitPacket.register();
    sendDebugMsg("registered cancel hit packet");
    leftClick();
    Client.scheduleTask(0, () => {
      serverRotations.resetRotation();
      DebugImpel()
        cancelHitPacket.unregister();
      sendDebugMsg("unregistered cancel hit packet");
    });
  });
}

///// DEBUG /////

function DebugImpel() {
  if (config.debugmode)
  sendDebugMsg("§bAutoimpel: §l§acomplete");
}


register("command", (pitch)=> {
 if (pitch == "click_up")  {pitch = -90}
 if (pitch == "click_down") {pitch = 90}
if (config.debugmode) {impelDoRotate(Player.getYaw(), pitch)} 
else {sendMsg("Debug mode not activated")}
}).setName("testimpelrotate").setTabCompletions("click_up", "click_down")


register("command", (pitch)=> {
 if (pitch == "click_up")  {pitch = -90}
 if (pitch == "click_down") {pitch = 90}
if (config.debugmode) {impelDontRotate(Player.getYaw(), pitch)} 
else {sendMsg("Debug mode not activated")}
}).setName("testimpelnorotate").setTabCompletions("click_up", "click_down")


register("command", ()=> {
if (config.debugmode) {cancelDigPacket.register()} 
else {sendMsg("Debug mode not activated")}
}).setName("testdigpacket")