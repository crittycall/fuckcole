import { EntityArmorStand, EntityEnderman } from "../../../BloomCore/utils/Utils"
import { scheduleTask } from "../../../tska/shared/ServerTick";
import { leftClick, rightClick, sendDebugMsg, swapToItem, swapToItemID } from "../../utils/utils";
import { McUtils } from "../../utils/mcUtils";

register("command",()=> {
    World.getAllEntities().forEach((entities)=> ChatLib.chat(entities.getName()))
    //ChatLib.chat(entities)
}).setName("getentities")


const registeratune = register("tick",() => {
const entities = World.getAllEntitiesOfType(EntityArmorStand)
const playerName = Player.getName();

entities.forEach((entity) => {
    const formattedName = ChatLib.removeFormatting(entity.getName())
    if (formattedName.includes(playerName)) BlazePos = entity.getPos()
    if (formattedName.includes("ASHEN")) Ashen()
})


}).unregister

function Ashen() {
//swapToItemID("HEARTFIRE_DAGGER")
swapToItem("Diamond Sword")
const helditem = Player.getHeldItem().getID()
ChatLib.chat(helditem)
McUtils.syncCurrentPlayItem()

if (helditem == "276.0") {
   scheduleTask(()=> Client.getMinecraft().field_71474_y.field_74313_G.field_74513_e = true, 1)
   scheduleTask(()=> Client.getMinecraft().field_71474_y.field_74313_G.field_74513_e = false, 2)

}}


register("command",() => {
ChatLib.chat(Player.getHeldItem().getItem())


}).setName("helditem")

register("command",() => {
Ashen()


}).setName("swap2sword")