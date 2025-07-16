import config from "./config";
import "./features/Riftstalker/Impel";
import "./features/Riftstalker/dudechill";
import { sendMsg } from "./utils/utils";
import "./commands/showme"
import "./commands/boom"
import "./commands/debug"
import "./features/Riftstalker/Melons"

register("command", () => config.openGUI()).setName("fuckcole").setAliases(["fc", "cole"]);
register("gameLoad", () => sendMsg("&aIt didnt fail loading ggwp"));
register("serverConnect", () => Client.scheduleTask(20, () => sendMsg("Make sure to run '/boom' and '/showme'!")))