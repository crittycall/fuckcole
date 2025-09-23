import config from "./config";
import "./features/cheats/Riftstalker/Impel";
import "./features/cheats/Riftstalker/dudechill";
import { sendMsg } from "./utils/utils";
import "./commands/showme";
import "./commands/boom";
import "./commands/debug";
import "./features/cheats/Riftstalker/Melons";
//import "./features/cheats/Riftstalker/Stake";
import "./features/cheats/Riftstalker/Tuba";
//import "./features/Demonlord/AutoAtune"
import "./features/Misc/bigdmgnumbers";
import "./features/misc/leaveparty";
register("command", () => config.openGUI())
  .setName("fuckcole")
  .setAliases(["fc", "cole"]);
register("gameLoad", () => sendMsg("&aIt didnt fail loading ggwp"));
register("serverConnect", () =>
  Client.scheduleTask(20, () =>
    sendMsg("Make sure to run '/boom' and '/showme'!")
  )
);
