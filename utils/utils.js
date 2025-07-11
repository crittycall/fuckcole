// 99% (realistically 100%) of this is liberated from jcnlkclient!! thanks jc for letting me be a skid <3
const KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");
export const prefix = ("§f[§afuckcole§f] ")
export const sendMsg = (msg) => ChatLib.chat(prefix + msg)

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

export const setSneakKey = (state) => KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74311_E.func_151463_i(), state);
export const Jump = new KeyBind(Client.getMinecraft().field_71474_y.field_74314_A);

export function doJump() {
    Jump.setState(true)
    Client.scheduleTask(2, () =>{
        Jump.setState(false)
    })
}
export const swapToItem = (targetItemName) => {
  if (Player.getHeldItem()?.includes(targetItemName)) return;
  const itemSlot = Player?.getInventory()?.getItems()?.findIndex((item) => {
    return item?.getName()?.toLowerCase()?.includes(targetItemName.toLowerCase());
  });
  if (itemSlot === -1 || itemSlot > 7) {
    ChatLib.chat(`&cUnable to find &6${targetItemName}&c in your hotbar`);
    return;
  } else {
    ChatLib.chat(`&aSwapping to item: &6${targetItemName}`);
    Player.setHeldItemIndex(itemSlot);
  }
};
