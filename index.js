import config from "./config";
import "./features/Riftstalker/Impel";

register("command", () => config.openGUI()).setName("criticall");
register("gameLoad", () => ChatLib.chat("crit 11 module loaded"));