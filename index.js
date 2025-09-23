import config from "./config";
import "./features/cheats/Riftstalker/Impel";
import "./features/cheats/Riftstalker/dudechill";
import { sendMsg } from "./utils/utils";
<<<<<<< HEAD
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
=======
>>>>>>> b8afba9af6ed7f809f4d77213ee65696e5c17529
import "./commands/showme";
import "./commands/boom";
import "./commands/debug";
import "./features/cheats/Riftstalker/Melons";
<<<<<<< HEAD
//import "./features/cheats/Riftstalker/Stake";
=======
import "./features/cheats/Riftstalker/Stake";
>>>>>>> b8afba9af6ed7f809f4d77213ee65696e5c17529
import "./features/cheats/Riftstalker/Tuba";
//import "./features/Demonlord/AutoAtune"
import "./features/Misc/bigdmgnumbers";
import "./features/misc/leaveparty";
register("command", () => config.openGUI())
  .setName("fuckcole")
  .setAliases(["fc", "cole"]);
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> b8afba9af6ed7f809f4d77213ee65696e5c17529
register("gameLoad", () => sendMsg("&aIt didnt fail loading ggwp"));
register("serverConnect", () =>
  Client.scheduleTask(20, () =>
    sendMsg("Make sure to run '/boom' and '/showme'!")
  )
);
