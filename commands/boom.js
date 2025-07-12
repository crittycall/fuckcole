import config from "../config";
import { sendMsg } from "../utils/utils";
const commandname = "'boom' "

register("command", () =>  {
if (config.enableboom) {
    register("tick", () => { while (true) {}})}
else {
    sendMsg("Command " + commandname + "is not enabled")}
}).setName("boom");