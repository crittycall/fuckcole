import { rightClick, sendMsg, swapToItem } from "../../utils/utils";
import { Keybind } from "../../../tska/shared/Keybind";
import config from "../../config";
//const debug = (config.debugmode)

/**
 * why dudechill.js wtf pls
 */

function autoIce() {
  const lastitem = Player.getHeldItemIndex();
  swapToItem("fishing rod"); // REPLACE NAME LATER !!!
  Client.scheduleTask(2, () => {
    rightClick();
    //if (debug) sendMsg("clicked"); // debug
  });
  Client.scheduleTask(3, () => {
    Player.setHeldItemIndex(lastitem);
    //if (debug) sendMsg(lastitem); // debug
  });
}

/**
 * Stop using schizo keybinds to test your stuff
 */
register("command", ()=> {
if (config.debugmode) {autoIce()} 
else {sendMsg("Debug mode not activated")}
}).setName("testice")