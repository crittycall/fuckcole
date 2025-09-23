// gamble responsibly
import { EntityArmorStand } from "../../../../BloomCore/utils/Utils";
import { sendDebugMsg } from "../../../utils/utils";

register("command", () => {
  const entity = Player.lookingAt();

  if (entity && entity.getEntity) {
    ChatLib.chat(`Looking at:`);
    ChatLib.chat(`Class: ${entity.getClassName()}`);
    ChatLib.chat(`Name: ${entity.getName()}`);
    ChatLib.chat(
      `Position: ${entity.getX().toFixed(1)}, ${entity
        .getY()
        .toFixed(1)}, ${entity.getZ().toFixed(1)}`
    );

    // Check if it has a custom name
    const customName = entity.getEntity().getCustomNameTag();
    if (customName) {
      ChatLib.chat(`Custom name: ${customName}`);
    }

    // Get health if it's a living entity
    if (entity.getEntity().getHealth) {
      ChatLib.chat(
        `Health: ${entity.getEntity().getHealth()}/${entity
          .getEntity()
          .getMaxHealth()}`
      );
    }
  } else {
    ChatLib.chat("Not looking at an entity");
  }
}).setName("entityinfo");

let tickCount = 0;

/*register("tick", () => {
    tickCount++;
    if (tickCount % 10 !== 0) return;
    
    const lookingAt = Player.lookingAt();
    
    if (lookingAt && lookingAt.entity) {
        sendDebugMsg("Entity class: " + lookingAt.entity);
    }
});

/*register("tick", () => {
    const lookingAt = Player.lookingAt();
    
    if (lookingAt && lookingAt.entity) {
        const entity = lookingAt.entity;
         const formattedName = ChatLib.removeFormatting(entity.getName());
  
      if (formattedName.includes(playerName)) bloodfiendPos = entity.getPos();
      if (entity.getName().includes("҉")) {
        sendDebugMsg("found stakeable entity")
        
  
        // Use toString() to get the entity string
        const entityString = entity.toString();
        
        if (entityString.includes("EntityOtherPlayerMP") && entityString.includes("҉")) {
            sendDebugMsg("stakeable mob found");
            sendDebugMsg(entity.toString())
            //yourFunction(entity);
        }
    }
}});

  register("command",()=> {
    const entities = World.getAllEntitiesOfType(EntityArmorStand);
    entities.forEach((entity)=>{
    sendDebugMsg(entity.getName())
    })
  }).setName("getnames")



   /*  register("step", () => {
    const entities = World.getAllEntitiesOfType(EntityArmorStand);
    const playerName = Player.getName();
    let bloodfiendPos = null;
    let stakePos = null;
    let playerArmorStandPos = null;
    let twinclawsTimer = null;
    entities.forEach((entity) => {
      const formattedName = ChatLib.removeFormatting(entity.getName());
  
      if (formattedName.includes(playerName)) bloodfiendPos = entity.getPos();
      if (entity.getName().includes("҉")) {
        sendDebugMsg("found stakeable entity")
        
  
      
      }
       if (twinclawsTimer) lastTwinclawsTimer = twinclawsTimer;
    }
  )}).setDelay(0.15)*/

register("tick", () => {
  const entities = World.getAllEntitiesOfType(EntityArmorStand);
  const playerName = Player.getName();
  let bloodfiendPos = null;
  let stakePos = null;

  entities.forEach((entity) => {
    const formattedName = ChatLib.removeFormatting(entity.getName());
    if (formattedName.includes(playerName)) bloodfiendPos = entity.getPos();
  });
});
