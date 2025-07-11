import { leftClick, rightClick, sendMsg, swapToItem, } from "../../utils/utils";
import { Keybind } from "../../../tska/shared/Keybind";

function lfice() {
const lastitem = Player.getHeldItemIndex()
swapToItem("diamond sword")
Client.scheduleTask(2,()=> {leftClick()
sendMsg("clicked")
})
Client.scheduleTask(3, ()=>{
Player.setHeldItemIndex(lastitem)
sendMsg(lastitem)
})
}

new Keybind("lfitem", Keyboard.KEY_NONE, "lfitem").registerKeyPress(() => lfice());