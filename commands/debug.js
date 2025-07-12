import config from "../config"
import { sendMsg } from "../utils/utils"

register("command", ()=> {
if (config.debugmode) {ChatLib.chat(config.debugtext)   
 } else {sendMsg("Debug mode not activated")}
}).setName("debug")