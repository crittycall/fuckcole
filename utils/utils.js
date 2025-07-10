const KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");


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