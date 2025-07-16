import {EntityArmorStand, rightClick, sendDebugMsg, sendMsg, swapToItem } from "../../utils/utils";
import config from "../../config";

//const debug = (config.debugmode)
/**
 * why dudechill.js wtf pls
 */

let lastTwinclawsTimer = null;

register("step", () => {
    const entities = World.getAllEntitiesOfType(EntityArmorStand);
    const playerName = Player.getName();
    let bloodfiendPos = null;
    let twinclawsPos = null;
    let playerArmorStandPos = null;
    let twinclawsTimer = null;
    if (!config.toggleIce) return;
    entities.forEach(entity => {
        const formattedName = ChatLib.removeFormatting(entity.getName());
        
        if (formattedName.includes("Bloodfiend")) {
            bloodfiendPos = entity.getPos();
           // sendDebugMsg(`Bloodfiend at: ${bloodfiendPos.x.toFixed(1)}, ${bloodfiendPos.y.toFixed(1)}, ${bloodfiendPos.z.toFixed(1)}`);
        }
        if (formattedName.includes("TWINCLAWS")) {
            twinclawsPos = entity.getPos();
           // sendDebugMsg(`TWINCLAWS at: ${twinclawsPos.x.toFixed(1)}, ${twinclawsPos.y.toFixed(1)}, ${twinclawsPos.z.toFixed(1)}`);
            //sendDebugMsg(entity.getName());
            
            // Extract timer from name (e.g., "TWINCLAWS 0.3s" -> "0.3")
            const timerMatch = formattedName.match(/TWINCLAWS\s+(\d+\.\d+)s/);
            if (timerMatch) {
                twinclawsTimer = parseFloat(timerMatch[1]);
            }
        }
        if (formattedName.includes(playerName)) {
            playerArmorStandPos = entity.getPos();
            //sendDebugMsg(`${playerName} armor stand at: ${playerArmorStandPos.x.toFixed(1)}, ${playerArmorStandPos.y.toFixed(1)}, ${playerArmorStandPos.z.toFixed(1)}`);
        }
    });
    
    // Only calculate distance between TWINCLAWS and player armor stand
    if (twinclawsPos && playerArmorStandPos) {
        const distance = Math.sqrt(
            Math.pow(playerArmorStandPos.x - twinclawsPos.x, 2) + 
            Math.pow(playerArmorStandPos.y - twinclawsPos.y, 2) + 
            Math.pow(playerArmorStandPos.z - twinclawsPos.z, 2)
        );
        //sendDebugMsg(`Distance between TWINCLAWS and ${playerName}: ${distance.toFixed(2)} blocks`);
        
        if (distance.toFixed(2) > 3) return;
        
        // Call autoIce() when timer is higher than last one (new attack started)
       if (twinclawsTimer && (lastTwinclawsTimer === null || twinclawsTimer > lastTwinclawsTimer-0.1)) {
            autoIce();
            sendDebugMsg(`autoIce() called! Timer: ${twinclawsTimer}s (was ${lastTwinclawsTimer}s)`);
        }
        // Update the last timer regardless
        if (twinclawsTimer) {
            lastTwinclawsTimer = twinclawsTimer;
        }
    } else {
        //sendDebugMsg("Could not find both TWINCLAWS and player armor stand for distance calculation");
    }
}).setDelay(0.15);

function autoIce() {
  const lastitem = Player.getHeldItemIndex();
    swapToItem("holy ice");
  Client.scheduleTask(5, () => {
    rightClick();
  });
  Client.scheduleTask(7, () => {
    Player.setHeldItemIndex(lastitem);
  });
}

/**
 * Stop using schizo keybinds to test your stuff
 */
register("command", () => {
  if (config.debugmode) autoIce();
  else sendMsg("Debug mode not activated");
}).setName("testice");
