import { sendDebugMsg, swapToItemID } from "../../../utils/utils";
import { rightClick } from "../../../utils/utils";
import config from "../../../config";
import Location from "../../../../tska/skyblock/Location";
// import { schedulecd } from "./ItemSwapScheduler";

const Automelon = register("step", () => {
  if (!config.automelon) return;
  const lastitem = Player.getHeldItemIndex();
  const maxHP = Player.asPlayerMP()?.getMaxHP();
  let HP = Player.getHP();
  if (HP < maxHP * config.HPThreshold) {
    // if(!schedulecd == 0) return;
    // schedulecd = schedulecd + 4
    swapToItemID("HEALING_MELON");
    Client.scheduleTask(2, () => rightClick());
    Client.scheduleTask(3, () => {
      Player.setHeldItemIndex(lastitem);
      sendDebugMsg("Auto melon complete");
    });
  }
})
  .setDelay(0.2)
  .unregister();

Location.onWorldChange((world) => {
  if (world === "the rift") Automelon.register();
  else Automelon.unregister();
});
