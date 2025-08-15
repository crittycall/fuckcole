import { C02PacketUseEntity, EntityArmorStand } from "../../../BloomCore/utils/Utils";
import { scheduleTask } from "../../../tska/shared/ServerTick";
import { sendDebugMsg } from "../../utils/utils";
import config from "../../config";


let displayText = ""
let lastUpdateTime = 0

register("step", () => {
    if (Date.now() - lastUpdateTime > 750) {
        numberGUI.unregister(); 
        displayText = ""
    }
}).setDelay(0.25)

register("packetSent",() => {
    if (!config.toggleBigDmgNumbers) return numberGUI.unregister();
    numberGUI.register();
    lastUpdateTime = Date.now()
    const tags = World.getAllEntitiesOfType(EntityArmorStand);
    scheduleTask(() => {
        tags.forEach((entities) => {
            if (!entities.getName().includes("✧")) return;
            displayText = entities.getName();
        });
    }, 2);
}).setFilteredClass(C02PacketUseEntity);



const numberGUI = register("renderOverlay", () => {
    let screenWidth = Renderer.screen.getWidth();
    let screenHeight = Renderer.screen.getHeight();
    let x = (screenWidth * 0.27) / 3.0; 
    let y = (screenHeight * 0.95) / 3.0; 

    GL11.glPushMatrix();
    GL11.glScalef(3.0, 3.0, 1.0);
    
    Renderer.drawStringWithShadow(displayText, x, y);
    
    GL11.glPopMatrix();
}).unregister()



