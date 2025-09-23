import { scheduleTask } from "../../../tska/shared/ServerTick";
import { Keybind } from "../../../tska/shared/Keybind";
import config from "../../config";
import { sendMsg } from "../../utils/utils";

new Keybind(
  "Auto Excuse",
  Keyboard.KEY_NONE,
  "§f[§afuckcole§f]"
).registerKeyPress(() => {
  if (!config.toggleExcuse) sendMsg("auto excuse is not enabled");
  else {
    const excuses = [
      "my grandma pulled down my pants.",
      "i have to walk my fish.",
      "my power went out.",
      "there's a snake in my socks.",
      "my dog went to the moon???",
      "my cat is playing wii sports past its bedtime,",
      "vs code broke.",
      "my teddy bear gained sentience!?",
      "my mom took out the trash and now he's my stepdad...",
      "the oppossum that lives in my house read animal farm???",
      "someone is under my table...",
    ];

    const closers = [" i gtg", " seeya", " later, alligator", " i gtg [this excuse was provided by fc Auto Excuse]"];

    const randomexcuse = Math.floor(Math.random() * excuses.length);
    const randomcloser = Math.floor(Math.random() * closers.length);

    ChatLib.command("pc " + excuses[randomexcuse] + closers[randomcloser]);
    scheduleTask(() => ChatLib.command("p leave"), 20);
  }
});
