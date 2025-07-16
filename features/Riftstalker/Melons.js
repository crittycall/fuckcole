import { registerWhen, sendDebugMsg,swapToItem } from "../../utils/utils";
import { rightClick } from "../../utils/utils";

let tickCounter = 0;

import config from "../../config";
registerWhen(register("tick", () => {

  tickCounter++;
  if (tickCounter % 10 !== 0) return;

  const lastitem = Player.getHeldItemIndex();
  let HP = Player.getHP();

  if (HP < 9) {
    swapToItem("juicy healing melon");
    Client.scheduleTask(2, () => rightClick());
    Client.scheduleTask(3, () => {
      Player.setHeldItemIndex(lastitem);
      sendDebugMsg("Auto melon complete");
    });
  }
}), () => config.automelon);