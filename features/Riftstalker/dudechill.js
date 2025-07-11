import { rightClick, sendMsg, swapToItem } from "../../utils/utils";
import { Keybind } from "../../../tska/shared/Keybind";

/**
 * why dudechill.js wtf pls
 */

function autoIce() {
  const lastitem = Player.getHeldItemIndex();
  swapToItem("fishing rod"); // REPLACE NAME LATER !!!
  Client.scheduleTask(2, () => {
    rightClick();
    sendMsg("clicked"); // debug
  });
  Client.scheduleTask(3, () => {
    Player.setHeldItemIndex(lastitem);
    sendMsg(lastitem); // debug
  });
}

/**
 * Stop using schizo keybinds to test your stuff
 */
new Keybind("lfitem", Keyboard.KEY_NONE, "lfitem").registerKeyPress(() => autoIce());