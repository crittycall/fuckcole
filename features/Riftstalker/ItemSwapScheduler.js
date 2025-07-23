import { sendDebugMsg } from "../../utils/utils"

global.schedulecd = 0

register("tick",() => {
if (!schedulecd == 0) { 
    schedulecd--
    sendDebugMsg(schedulecd)
 }
})