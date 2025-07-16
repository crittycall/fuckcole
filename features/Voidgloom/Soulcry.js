import config from "../../config";
import { leftClick, sendMsg } from "../../utils/utils";

function Soulcry() {
  if (Player.getHeldItem()?.getName()?.removeFormatting()?.toLowerCase()?.includes("diamond pickaxe")) {
    Client.scheduleTask(5, () => {
      leftClick();
      sendMsg(helditem);
    });
  }
}

register("command", () => {
  if (config.debugmode) Soulcry();
  else sendMsg("Debug mode not activated");
}).setName("testsoulcry");