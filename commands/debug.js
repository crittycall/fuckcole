import config from "../config";


register("command", () => {
  if (config.debugmode) ChatLib.chat(config.debugtext);
  else sendMsg("Debug mode not activated");
}).setName("checkdebugtext");

register("command", () => {
  if (config.debugmode) sendMsg(Player.getHeldItem()?.getName()?.removeFormatting()?.toLowerCase());
  else sendMsg("Debug mode not activated");
}).setName("getitem");


