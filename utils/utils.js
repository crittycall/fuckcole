/**
 * 99% (realistically 100%) of this is liberated from jcnlkclient!! thanks jc for letting me be a skid <3
 * 
 * This is so schizo omg pls kill me crit
 */

import config from "../config";

export const bezier = (t, initial, p1, p2, final) => (1 - t) * (1 - t) * (1 - t) * initial + 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t * final;
export const setSneakKey = (state) => KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74311_E.func_151463_i(), state);
export const C02PacketUseEntity = Java.type("net.minecraft.network.play.client.C02PacketUseEntity");
export let prefix = config.togglecustomprefix ? "[§a" + config.prefixtext + "§f] §r" : "§f[§afuckcole§f] §r"
export const Jump = new KeyBind(Client.getMinecraft().field_71474_y.field_74314_A);
export const KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");
export const sendMsg = (msg) => ChatLib.chat(prefix + msg);

export function leftClick() {
  const leftClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147116_af", null);
  leftClickMethod.setAccessible(true);
  leftClickMethod.invoke(Client.getMinecraft(), null);
}

export function rightClick() {
  const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag", null);
  rightClickMethod.setAccessible(true);
  rightClickMethod.invoke(Client.getMinecraft(), null);
}

export function rotate(yaw, pitch) {
  if (Number.isNaN(yaw) || Number.isNaN(pitch)) return;
  const player = Player.getPlayer();
  player.field_70177_z = yaw;
  player.field_70125_A = pitch;
}

export function doJump() {
  Jump.setState(true);
  Client.scheduleTask(2, () => Jump.setState(false));
}

export const swapToItem = (targetItemName) => {
  if (Player.getHeldItem()?.includes(targetItemName)) return;
  const itemSlot = Player?.getInventory()?.getItems()?.findIndex((item) => item?.getName()?.toLowerCase()?.includes(targetItemName.toLowerCase()));
  if (itemSlot === -1 || itemSlot > 7) {
    ChatLib.chat(`&cUnable to find &6${targetItemName}&c in your hotbar`);
    return;
  } else {
    ChatLib.chat(`&aSwapping to item: &6${targetItemName}`);
    Player.setHeldItemIndex(itemSlot);
  }
};

export function rotateSmoothly(yaw, pitch, time) {
  while (yaw >= 180) yaw -= 360;
  while (pitch >= 180) pitch -= 360;
  const initialYaw = Player.getYaw();
  const initialPitch = Player.getPitch();
  const initialTime = Date.now();
  const trigger = register("step", () => {
    const progress = time <= 0 ? 1 : Math.max(Math.min((Date.now() - initialTime) / time, 1), 0);
    const amount = bezier(progress, 0, 1, 1, 1);
    rotate(initialYaw + (yaw - initialYaw) * amount, initialPitch + (pitch - initialPitch) * amount);
    if (progress >= 1) trigger.unregister();
  });
}