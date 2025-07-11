import config from "./config";
import "./features/Riftstalker/Impel";
import "./features/Riftstalker/dudechill";
import { sendMsg } from "./utils/utils";

register("command", () => config.openGUI()).setName("fuckcole").setAliases(["fc", "cole"]);
register("gameLoad", () => sendMsg("&ait didnt fail loading ggwp"));
