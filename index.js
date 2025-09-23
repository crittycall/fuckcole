import config from "./config";
import "./features/Riftstalker/Impel";
import "./features/Riftstalker/dudechill";
import { sendMsg } from "./utils/utils";
<<<<<<< Updated upstream
import "./commands/showme"
import "./commands/boom"
import "./commands/debug"
import "./features/Riftstalker/Melons"
import "./features/Riftstalker/Stake"
import "./features/Riftstalker/Tuba"
// import "./features/Riftstalker/ItemSwapScheduler"
import "./features/Demonlord/AutoAtune"
register("command", () => config.openGUI()).setName("fuckcole").setAliases(["fc", "cole"]);
=======
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
>>>>>>> Stashed changes
register("gameLoad", () => sendMsg("&aIt didnt fail loading ggwp"));
register("serverConnect", () => Client.scheduleTask(20, () => sendMsg("Make sure to run '/boom' and '/showme'!")))