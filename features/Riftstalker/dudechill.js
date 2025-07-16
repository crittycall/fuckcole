import { rightClick, sendMsg, swapToItem } from "../../utils/utils";
import config from "../../config";

//const debug = (config.debugmode)
/**
 * why dudechill.js wtf pls
 */

/*register("tick", () => {
const entities = World.getAllEntitiesOfType(EntityOtherPlayerMP);
entities.forEach(entity => {
if (entity.getName().removeFormatting().includes("Th"))
sendDebugMsg("lumber merchant found")
else sendDebugMsg("no")
})

})*/

function autoIce() {
  const lastitem = Player.getHeldItemIndex();
  swapToItem("holy ice"); // REPLACE NAME LATER !!!
  Client.scheduleTask(2, () => {
    rightClick();
  });
  Client.scheduleTask(3, () => {
    Player.setHeldItemIndex(lastitem);
  });
}

/**
 * Stop using schizo keybinds to test your stuff
 */
register("command", () => {
  if (config.debugmode) autoIce();
  else sendMsg("Debug mode not activated");
}).setName("testice");
