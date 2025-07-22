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
  playerList: mc.field_71474_y.field_74321_H.func_151463_i()
};

export function setKeyState(key, state, checkForPress = false) {
  const actualState = checkForPress ? KeyBoard.isKeyDown(key) : state;
  KeyBinding.func_74510_a(key, actualState);
}