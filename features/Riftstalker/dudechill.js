import { rightClick, sendDebugMsg, sendMsg, swapToItem } from "../../utils/utils";
import { Keybind } from "../../../tska/shared/Keybind";
import config from "../../config";
//const debug = (config.debugmode)
const EntityOtherPlayerMP = Java.type.class("net.minecraft.entity.player.EntityOtherPlayerMP");
/**
 * why dudechill.js wtf pls
 */


register("tick", () => {
const entities = World.getAllEntitiesOfType("net.minecraft.entity.player.EntityOtherPlayerMP")
entities.forEach(Entity => {
if (Entity.getName().removeFormatting() === "Lumber Merchant")
sendDebugMsg("lumber merchant found")
else sendDebugMsg("no")
})

})

function autoIce() {
  const lastitem = Player.getHeldItemIndex();
  swapToItem("holy ice"); // REPLACE NAME LATER !!!
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