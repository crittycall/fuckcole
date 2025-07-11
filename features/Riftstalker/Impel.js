import { Keybind } from "../../../tska/shared/Keybind";
import { doJump, leftClick, setSneakKey } from "../../utils/utils";
import serverRotations from "../../utils/serverRotations";
import config from "../../config";

new Keybind("jumper", Keyboard.KEY_NONE, "jumper").registerKeyPress(() => doJump());

const processedCommands = new Set();
let clearTimeout = null;

///grabbing title///
register("packetReceived", (packet, event) => {
  if (!config.impel) return;
  const type = packet.func_179807_a().toString();
  const message = ChatLib.removeFormatting(packet.func_179805_b()?.func_150260_c());

  if (message.startsWith("Impel:")) {
    if (clearTimeout) clearTimeout.cancel();

    clearTimeout = setTimeout(() => {
      processedCommands.clear();
      clearTimeout = null;
    }, 1000);

    const commandPart = message.split(" ").slice(0, 2).join(" ");

    if (processedCommands.has(commandPart)) return;
    processedCommands.add(commandPart);

    if (message.startsWith("Impel: CLICK UP")) impelv2(Player.getYaw(), -90);
    else if (message.startsWith("Impel: CLICK DOWN")) impelv2(Player.getYaw(), 90);
    else if (message.startsWith("Impel: SNEAK")) {
      ChatLib.chat("§bAutoimpel: §l§cstarted");
      setSneakKey(true);
      setTimeout(() => setSneakKey(false), 50);
      ChatLib.chat("§bAutoimpel: §l§acomplete");
    } else if (message.startsWith("Impel: JUMP")) {
      ChatLib.chat("§bAutoimpel: §l§cstarted");
      doJump();
      ChatLib.chat("§bAutoimpel: §l§acomplete");
    }
  }

}).setFilteredClass(Java.type("net.minecraft.network.play.server.S45PacketTitle"));

///doing the ban packet///

function impelv2(yaw, pitch) {
  serverRotations.setRotation(yaw, pitch, () => {
    ChatLib.chat("§bAutoimpel: §l§cstarted");
    leftClick();
    Client.scheduleTask(5, () => {
      serverRotations.resetRotation();
      ChatLib.chat("§bAutoimpel: §l§acomplete");
    });
  });
}