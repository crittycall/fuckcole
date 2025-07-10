import { Keybind } from "../tska/shared/Keybind"
import { Jump,  leftClick, rotate, setSneakKey} from "./utils/utils"


register("packetReceived", (packet, event) => {
  const type = packet.func_179807_a().toString();
    const message = ChatLib.removeFormatting(packet.func_179805_b()?.func_150260_c());
 
    if (message.startsWith ("Impel: CLICK UP")) {
    impel(Player.getYaw(), -90);
  }
  else if (message.startsWith ("Impel: CLICK DOWN")) {
    impel(Player.getYaw(), 90);
  }
  else if (message.startsWith ("Impel: SNEAK")){
    ChatLib.chat("§bAutoimpel: §l§cstarted");
    setSneakKey(true);
    setTimeout(()=>setSneakKey(false), 50);
    ChatLib.chat("§bAutoimpel: §l§acomplete");
  }
  else if (message.startsWith ("Impel: JUMP")){
    ChatLib.chat("§bAutoimpel: §l§cstarted");
    Jump.setState(true)
    setTimeout(()=>Jump.setState(false), 25)
    ChatLib.chat("§bAutoimpel: §l§acomplete");
  }
  //ChatLib.chat(message); message for debug
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S45PacketTitle"));


function impel(yaw, pitch){
ChatLib.chat("§bAutoimpel: §l§cstarted");

rotate(yaw,pitch)
setTimeout(()=> leftClick(), 50);
setTimeout(() => rotate(Player.getYaw(), Math.floor(0+(Math.random()*10))), 100);

ChatLib.chat("§bAutoimpel: §l§acomplete");
  
  }
register("gameLoad", () => ChatLib.chat("crit 11 module loaded"));
new Keybind("jumper", Keyboard.KEY_NONE, "jumper").registerKeyPress(()=>jumper())