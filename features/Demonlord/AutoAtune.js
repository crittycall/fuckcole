import { EntityArmorStand, EntityEnderman } from "../../../BloomCore/utils/Utils"
import { scheduleTask } from "../../../tska/shared/ServerTick";
import { swapToItemID, keybinds, setKeyState, rightClick,} from "../../utils/utils";
import { McUtils } from "../../utils/mcUtils";

let ashencd = false;
let spiritcd = false;
let auriccd = false;
let crystalcd = false;


register("command",()=> {
    World.getAllEntities().forEach((entities)=> ChatLib.chat(entities.getName() + entities.getClassName()))
    //ChatLib.chat(entities)
}).setName("getentities")


const registeratune = register("tick",() => {
const entities = World.getAllEntitiesOfType(EntityArmorStand)
const playerName = Player.getName();

entities.forEach((entity) => {
    const formattedName = ChatLib.removeFormatting(entity.getName())
    if (formattedName.includes(playerName)) BlazePos = entity.getPos()
    if (formattedName.includes("ASHEN" || !ashencd)) Ashen()
})


}).unregister

function Ashen() {
  spiritcd = false; auriccd = false; crystalcd = false;
  if (ashencd == true) return;
    ashencd = true
    swapToItemID("FIRE")
    const helditem = Player.getHeldItem().getID()
    ChatLib.chat(helditem)
  if (helditem == "283.0") {
    Client.scheduleTask(2,()=> rightClick())
}}

function Spirit() {
  ashencd = false; auriccd = false; crystalcd = false;
  if (spiritcd == true) return;
    spiritcd = true
    swapToItemID("MAW")
    const helditem = Player.getHeldItem().getID()
    ChatLib.chat(helditem)
  if (helditem == "276.0") {
    Client.scheduleTask(2,()=> rightClick())
}}

function Auric() {
  ashencd = false; spiritcd = false; crystalcd = false;
  if (auriccd == true) return;
    auriccd = true
    swapToItemID("FIRE")
    const helditem = Player.getHeldItem().getID()
    ChatLib.chat(helditem)
  if (helditem == "272.0") {
    Client.scheduleTask(2,()=> rightClick())
}}

function Crystal() {
  ashencd = false; spiritcd = false; auriccd = false;
  if (crystalcd == true) return;
    crystalcd = true
    swapToItemID("MAW")
    const helditem = Player.getHeldItem().getID()
    ChatLib.chat(helditem)
  if (helditem == "267.0") {
    Client.scheduleTask(2,()=> rightClick())
}}
register("command",() => {
ChatLib.chat(Player.getHeldItem().getID())


}).setName("helditem")

register("command",() => {
Ashen()
scheduleTask(()=> Spirit(), 40)
scheduleTask(()=> Auric(), 80)
scheduleTask(()=> Crystal(), 120)

}).setName("swap2sword")

