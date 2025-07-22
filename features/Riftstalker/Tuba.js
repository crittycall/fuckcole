import { scheduleTask } from "../../../tska/shared/ServerTick";
import Location from "../../../tska/skyblock/Location";
import config from "../../config";
import { rightClick, sendDebugMsg, swapToItemID } from "../../utils/utils";


const cooldown = false;
const UseTuba = register("step",() => {
    if (!config.autotuba) return;
    const lastitem = Player.getHeldItemIndex()
    if (cooldown == false) {
      sendDebugMsg("autotuba started")
      cooldown = true;
      swapToItemID("TUBA");
      Client.scheduleTask(2,() => rightClick());
      Client.scheduleTask(4, () => Player.setHeldItemIndex(lastitem));
      scheduleTask(() => cooldown = false, 500)

}



}).setDelay(1).unregister()



Location.onWorldChange((world) => {
  if (world === "the rift") UseTuba.register();
  else UseTuba.unregister();
});