import config from "./config";
import "./features/Riftstalker/Impel";
import "./features/Riftstalker/dudechill"


register("command", () => config.openGUI()).setName("criticall").setAliases("cl");
register("gameLoad", () => ChatLib.chat("crit 11 module loaded"));