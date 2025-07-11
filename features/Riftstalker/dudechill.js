import { rightClick, swapToItem } from "../../utils/utils";
import { Keybind } from "../../../tska/shared/Keybind";

function lfice() {
const lastitem = Player.getHeldItemIndex()
swapToItem("diamond sword")
Client.scheduleTask(5,()=> {rightClick()})
Player.setHeldItemIndex(lastitem)
}
new Keybind("lfitem", Keyboard.KEY_NONE, "lfitem").registerKeyPress(() => lfice());