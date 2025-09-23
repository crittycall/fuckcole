import config from "../../../config";
import { leftClick, sendMsg } from "../../../utils/utils";

register("command", () => {
  if (config.debugmode) Soulcry();
  else sendMsg("Debug mode not activated");
}).setName("testsoulcry");
