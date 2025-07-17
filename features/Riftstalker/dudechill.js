import { rightClick, sendDebugMsg, sendMsg, swapToItem, swapToItemID } from "../../utils/utils";
import { EntityArmorStand } from "../../../BloomCore/utils/Utils";
import { scheduleTask } from "../../../tska/shared/ServerTick";
import Location from "../../../tska/skyblock/Location";
import config from "../../config";

/**
 * why dudechill.js wtf pls
 */

let lastTwinclawsTimer = null;

const autoiceregister = register("step", () => {
  const entities = World.getAllEntitiesOfType(EntityArmorStand);
  const playerName = Player.getName();
  let bloodfiendPos = null;
  let twinclawsPos = null;
  let playerArmorStandPos = null;
  let twinclawsTimer = null;
  if (!config.toggleIce) return;
  entities.forEach((entity) => {
    const formattedName = ChatLib.removeFormatting(entity.getName());

    if (formattedName.includes("Bloodfiend")) bloodfiendPos = entity.getPos();
    if (formattedName.includes("TWINCLAWS")) {
      twinclawsPos = entity.getPos();

      const timerMatch = formattedName.match(/TWINCLAWS\s+(\d+\.\d+)s/);
      if (timerMatch) twinclawsTimer = parseFloat(timerMatch[1]);
    }
    if (formattedName.includes(playerName)) {
      playerArmorStandPos = entity.getPos();
    }
  });

  if (twinclawsPos && playerArmorStandPos) {
    const distance = Math.sqrt(Math.pow(playerArmorStandPos.x - twinclawsPos.x, 2) + Math.pow(playerArmorStandPos.y - twinclawsPos.y, 2) + Math.pow(playerArmorStandPos.z - twinclawsPos.z, 2));

    if (distance.toFixed(2) > 3) return;

    if (twinclawsTimer && (lastTwinclawsTimer === null || twinclawsTimer > lastTwinclawsTimer - 0.1)) {
      scheduleTask(()=>autoIce(), 7);
      sendDebugMsg(`autoIce() called! Timer: ${twinclawsTimer}s (was ${lastTwinclawsTimer}s)`);
    }
    if (twinclawsTimer) lastTwinclawsTimer = twinclawsTimer;
  }
}).setDelay(0.15).unregister();

function autoIce() {
  const lastitem = Player.getHeldItemIndex();
  swapToItemID("HOLY_ICE");
  scheduleTask(() => rightClick(), 1);
  scheduleTask(() => Player.setHeldItemIndex(lastitem), 2);
}

Location.onWorldChange((world) => {
  if (world === "the rift") autoiceregister.register();
  else autoiceregister.unregister();
});

register("command", () => {
  if (config.debugmode) autoIce();
  else sendMsg("Debug mode not activated");
}).setName("testice");