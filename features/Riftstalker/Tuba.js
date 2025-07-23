import { scheduleTask } from "../../../tska/shared/ServerTick";
import Location from "../../../tska/skyblock/Location";
import config from "../../config";
import { rightClick, sendDebugMsg, swapToItemID } from "../../utils/utils";






Location.onWorldChange((world) => {
  sendDebugMsg(world)
  if (world === "the rift") { 
    cooldownmanager.register();
    cooldown = 20
    sendDebugMsg("Tuba cooldown reset!")
  } 
  else cooldownmanager.unregister();
});

let cooldown = 500
const cooldownmanager = register("tick",() => {
  if (!config.autotuba) return;
  if (!cooldown == 0) {
  cooldown--;
  // sendDebugMsg(cooldown);
  }
   UseTuba();
})

function UseTuba() {
const lastitem = Player.getHeldItemIndex();
  if (!cooldown == 0) return; 
  swapToItemID("TUBA");
  // schedulecd = schedulecd + 4
  scheduleTask(() => rightClick(), 2);
  scheduleTask(()=> Player.setHeldItemIndex(lastitem), 3);
  cooldown = 500;
}