/**
 * 99% (realistically 100%) of this is liberated from jcnlkclient!! thanks jc for letting me be a skid <3
 *
 * This is so schizo omg pls kill me crit
 */
import { getSkyblockItemID } from "../../BloomCore/utils/Utils";
import config from "../config";

export const bezier = (t, initial, p1, p2, final) =>
  (1 - t) * (1 - t) * (1 - t) * initial +
  3 * (1 - t) * (1 - t) * t * p1 +
  3 * (1 - t) * t * t * p2 +
  t * t * t * final;
export const setSneakKey = (state) =>
  KeyBinding.func_74510_a(
    Client.getMinecraft().field_71474_y.field_74311_E.func_151463_i(),
    state
  );
export let prefix = config.togglecustomprefix
  ? "[§a" + config.prefixtext + "§f] §r"
  : "§f[§afuckcole§f] §r";
export const Jump = new KeyBind(
  Client.getMinecraft().field_71474_y.field_74314_A
);
export const KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");
export const sendMsg = (msg) => ChatLib.chat(prefix + msg);
export const debugPrefix = "§f[§aDEBUG§f] §r";
export const C07PacketPlayerDigging = Java.type(
  "net.minecraft.network.play.client.C07PacketPlayerDigging"
);
export const MathHelper = Java.type("net.minecraft.util.MathHelper");
export const mc = Client.getMinecraft();
export const Float = Java.type("java.lang.Float");
export const PlayerControllerMP = Java.type(
  "net.minecraft.client.multiplayer.PlayerControllerMP"
);

export function sendDebugMsg(msg) {
  if (!config.debugmode) return;
  ChatLib.chat(debugPrefix + prefix + msg);
}

export function leftClick() {
  const leftClickMethod = Client.getMinecraft()
    .getClass()
    .getDeclaredMethod("func_147116_af", null);
  leftClickMethod.setAccessible(true);
  leftClickMethod.invoke(Client.getMinecraft(), null);
}

export function rightClick() {
  const rightClickMethod = Client.getMinecraft()
    .getClass()
    .getDeclaredMethod("func_147121_ag", null);
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
  const itemSlot = Player?.getInventory()
    ?.getItems()
    ?.findIndex((item) =>
      item?.getName()?.toLowerCase()?.includes(targetItemName.toLowerCase())
    );
  if (itemSlot === -1 || itemSlot > 7) {
    sendDebugMsg(`&cUnable to find &6${targetItemName}&c in your hotbar`);
    return;
  } else {
    sendDebugMsg(`&aSwapping to item: &6${targetItemName}`);
    Player.setHeldItemIndex(itemSlot);
  }
};

export const swapToItemID = (swapItems) => {
  const itemsToSwap = Array.isArray(swapItems) ? swapItems : [swapItems];
  const currentItemID = getSkyblockItemID(Player.getHeldItem())?.toLowerCase();

  if (itemsToSwap.some((item) => currentItemID?.includes(item.toLowerCase())))
    return;

  for (const targetItem of itemsToSwap) {
    const itemSlot = Player?.getInventory()
      ?.getItems()
      ?.findIndex((item) =>
        getSkyblockItemID(item)
          ?.toLowerCase()
          ?.includes(targetItem.toLowerCase())
      );

    if (itemSlot !== -1 && itemSlot <= 7) {
      sendDebugMsg(`&aSwapping to item: &6${targetItem}`);
      Player.setHeldItemIndex(itemSlot);
      return;
    }
  }

  if (itemsToSwap.length === 1)
    sendDebugMsg(`&cUnable to find &6${itemsToSwap[0]}&c in your hotbar`);
  else
    sendDebugMsg(
      `&cUnable to find any of &6${itemsToSwap.join(", ")}&c in your hotbar`
    );
};

export function rotateSmoothly(yaw, pitch, time) {
  while (yaw >= 180) yaw -= 360;
  while (pitch >= 180) pitch -= 360;
  const initialYaw = Player.getYaw();
  const initialPitch = Player.getPitch();
  const initialTime = Date.now();
  const trigger = register("step", () => {
    const progress =
      time <= 0
        ? 1
        : Math.max(Math.min((Date.now() - initialTime) / time, 1), 0);
    const amount = bezier(progress, 0, 1, 1, 1);
    rotate(
      initialYaw + (yaw - initialYaw) * amount,
      initialPitch + (pitch - initialPitch) * amount
    );
    if (progress >= 1) trigger.unregister();
  });
}
const SettingsGui = Java.type("gg.essential.vigilance.gui.SettingsGui");
const registers = [];
export const registerWhen = (trigger, dependency) => {
  registers.push({
    controller: trigger.unregister(),
    dependency,
    registered: false,
  });
};

export const setRegisters = () => {
  registers.forEach((item) => {
    const shouldBeRegistered = item.dependency();
    if (shouldBeRegistered && !item.registered) {
      item.controller.register();
      item.registered = true;
    } else if (!shouldBeRegistered && item.registered) {
      item.controller.unregister();
      item.registered = false;
    }
  });
};

register("gameLoad", () => setRegisters());
register("guiClosed", (gui) => {
  if (gui instanceof SettingsGui) setRegisters();
});

export function DIGGER(x, y, z) {
  if (!config.senddigpacket) return;
  Client.sendPacket(
    new net.minecraft.network.play.client.C07PacketPlayerDigging(
      net.minecraft.network.play.client.C07PacketPlayerDigging.Action.START_DESTROY_BLOCK,
      new net.minecraft.util.BlockPos(x, y, z),
      net.minecraft.util.EnumFacing.DOWN
    )
  );
  Client.scheduleTask(2, () =>
    Client.sendPacket(
      new net.minecraft.network.play.client.C07PacketPlayerDigging(
        net.minecraft.network.play.client.C07PacketPlayerDigging.Action.ABORT_DESTROY_BLOCK,
        new net.minecraft.util.BlockPos(x, y, z),
        net.minecraft.util.EnumFacing.DOWN
      )
    )
  );
}

export const keybinds = {
  forward: mc.field_71474_y.field_74351_w.func_151463_i(),
  backward: mc.field_71474_y.field_74366_z.func_151463_i(),
  left: mc.field_71474_y.field_74370_x.func_151463_i(),
  right: mc.field_71474_y.field_74368_y.func_151463_i(),
  jump: mc.field_71474_y.field_74314_A.func_151463_i(),
  sneak: mc.field_71474_y.field_74311_E.func_151463_i(),
  leftClick: mc.field_71474_y.field_74312_F.func_151463_i(),
  rightClick: mc.field_71474_y.field_74313_G.func_151463_i(),
  pickItem: mc.field_71474_y.field_74322_I.func_151463_i(),
  drop: mc.field_71474_y.field_74316_C.func_151463_i(),
  hotbar1: mc.field_71474_y.field_151456_ac[0].func_151463_i(),
  hotbar2: mc.field_71474_y.field_151456_ac[1].func_151463_i(),
  hotbar3: mc.field_71474_y.field_151456_ac[2].func_151463_i(),
  hotbar4: mc.field_71474_y.field_151456_ac[3].func_151463_i(),
  hotbar5: mc.field_71474_y.field_151456_ac[4].func_151463_i(),
  hotbar6: mc.field_71474_y.field_151456_ac[5].func_151463_i(),
  hotbar7: mc.field_71474_y.field_151456_ac[6].func_151463_i(),
  hotbar8: mc.field_71474_y.field_151456_ac[7].func_151463_i(),
  hotbar9: mc.field_71474_y.field_151456_ac[8].func_151463_i(),
  chat: mc.field_71474_y.field_74310_D.func_151463_i(),
  command: mc.field_71474_y.field_74323_J.func_151463_i(),
  playerList: mc.field_71474_y.field_74321_H.func_151463_i(),
};

export function setKeyState(key, state, checkForPress = false) {
  const actualState = checkForPress ? KeyBoard.isKeyDown(key) : state;
  KeyBinding.func_74510_a(key, actualState);
}
