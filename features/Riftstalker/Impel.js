import { Keybind } from "../../../tska/shared/Keybind";
import { rotateSmoothly, doJump, leftClick, sendMsg, setSneakKey } from "../../utils/utils";
import serverRotations from "../../utils/serverRotations";
import config from "../../config";




// Variables and State Management
const processedCommands = new Set();
let clearTimeout = null;

// Keybind Registration
//new Keybind("Dorotate", Keyboard.KEY_NONE, "Dorotate").registerKeyPress(() => 
    //impelDoRotate(Player.getYaw(), 90)
//);
//new Keybind("Dontrotate", Keyboard.KEY_NONE, "Dontrotate").registerKeyPress(() => 
    //impelDontRotate(Player.getYaw(), 90)
//s);

// Packet Handlers
const cancelpacket = register("packetSent", (packet, event) => {
    const packetName = packet.class.getSimpleName();
    if (packetName !== "C02PacketUseEntity") return;
    cancel(event);
}).setFilteredClass(Java.type("net.minecraft.network.play.client.C02PacketUseEntity")).unregister();

register("packetReceived", (packet, event) => {
    if (!config.toggleImpel) return;
    
    const type = packet.func_179807_a().toString();
    const message = ChatLib.removeFormatting(packet.func_179805_b()?.func_150260_c());

    if (message.startsWith("Impel:")) {
        // Clear timeout management
        if (clearTimeout) clearTimeout.cancel();

        clearTimeout = setTimeout(() => {
            processedCommands.clear();
            clearTimeout = null;
        }, 1000);

        // Command deduplication
        const commandPart = message.split(" ").slice(0, 2).join(" ");
        if (processedCommands.has(commandPart)) return;
        processedCommands.add(commandPart);

        // Command handling
        if (message.startsWith("Impel: CLICK UP")) {
            if (config.noRotate) {
                impelDontRotate(Player.getYaw(), -90);
            } else {
                impelDoRotate(Player.getYaw(), -90);
            }
        } else if (message.startsWith("Impel: CLICK DOWN")) {
            if (config.noRotate) {
                impelDontRotate(Player.getYaw(), 90);
            } else {
                impelDoRotate(Player.getYaw(), 90);
            }
        } else if (message.startsWith("Impel: SNEAK")) {
            sendMsg("§bAutoimpel: §l§cstarted");
            setSneakKey(true);
            setTimeout(() => setSneakKey(false), 50);
            sendMsg("§bAutoimpel: §l§acomplete");
        } else if (message.startsWith("Impel: JUMP")) {
            sendMsg("§bAutoimpel: §l§cstarted");
            doJump();
            sendMsg("§bAutoimpel: §l§acomplete");
        }
    }
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S45PacketTitle"));

// Core Functions
function impelDoRotate(yaw, pitch) {
    let oldpitch = Player.getPitch();
    sendMsg("§bAutoimpel: §l§cstarted");
    rotateSmoothly(yaw, pitch, 100);
    setTimeout(() => {
        leftClick();
        rotateSmoothly(Player.getYaw(), oldpitch, 50);
    }, 100);
    sendMsg("§bAutoimpel: §l§acomplete");
}

function impelDontRotate(yaw, pitch) {
    serverRotations.setRotation(yaw, pitch, () => {
        sendMsg("§bAutoimpel: §l§cstarted");
        cancelpacket.register();
        leftClick();
        
        Client.scheduleTask(0, () => {
            serverRotations.resetRotation();
            sendMsg("§bAutoimpel: §l§acomplete");
            cancelpacket.unregister();
        });
    });
}