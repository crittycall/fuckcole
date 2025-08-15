import { @Vigilant, @SwitchProperty, @TextProperty, @SliderProperty, @ButtonProperty, @SelectorProperty, @DecimalSliderProperty } from "Vigilance";

@Vigilant("Fuckcole", "§aFuckcole§r", {
    getCategoryComparator: () => (a, b) => {
        const order = ["Settings", "Commands", "Vampire Nuke", "Blaze Helper", "Misc", "Debug"];
        return order.indexOf(a.name) - order.indexOf(b.name);
    }

}) // schizo color sooo cool ik

class Config {
    ///// RIFTSTALKER /////
    @SwitchProperty({
        name: "Auto Impel",
        description: "",
        category: "Vampire Nuke",
        subcategory: "Auto Impel"
    })
    toggleImpel = false;

    @SliderProperty({
        name: "Rotate Speed (in)",
        description: "Speed is in ms; does not apply to no rotate (lower ms = riskier)",
        category: "Vampire Nuke",
        subcategory: "Auto Impel",
        min: 50,
        max: 500
    })
     impelSpeedIn = 100;

     @SliderProperty({
        name: "Rotate Speed (out)",
        description: "Speed is in ms; does not apply to no rotate (lower ms = riskier)",
        category: "Vampire Nuke",
        subcategory: "Auto Impel",
        min: 50,
        max: 500
    })
     impelSpeedOut = 100;

    @SwitchProperty({
        name: "No Rotate",
        description: "Makes auto impel serversided (risky cuz crit can't code)",
        category: "Vampire Nuke",
        subcategory: "Auto Impel"
    })
    noRotate = false;

    @SwitchProperty({
        name: "Auto Holy Ice",
        description: "",
        category: "Vampire Nuke",
        subcategory: "Auto use Items"
    })
    toggleIce = false;

    @SwitchProperty({
        name: "Auto Melon",
        description: "",
        category: "Vampire Nuke",
        subcategory: "Auto use Items"
    })
    automelon = false;

    @DecimalSliderProperty({
        name: "HP Threshold",
        category: "Vampire Nuke",
        subcategory: "Auto use Items",
        minF: 0.10,
        maxF: 0.9
    })
    HPThreshold = 0.3;

    @SwitchProperty({
        name: "Auto Tuba",
        description: "",
        category: "Vampire Nuke",
        subcategory: "Auto use Items"
    })
    autotuba = false;
    
    ///// DEMONLORD /////
    @SwitchProperty({
        name: "Auto Atune",
        description: "",
        category: "Blaze Helper",
        subcategory: "Automation"
    })
    toggleAtune = false;
    ///// MISC /////
    @SwitchProperty({
        name: "Display Damage on Hud",
        description: "",
        category: "Misc",
        subcategory: "Hud"
    })
    toggleBigDmgNumbers = false;

    ///// SETTINGS /////
    @SwitchProperty({
        name: "Toggle Custom Prefix",
        description: "",
        category: "Settings",
        subcategory: "Fuckcole settings"
    })
    togglecustomprefix = false;
   
    @TextProperty({
        name: "Custom Prefix Text",
        description: "",
        category: "Settings",
        subcategory: "Fuckcole settings"
    })
    prefixtext = ""
    ///// COMMANDS /////
    @SwitchProperty({
        name: "Show Me",
        description: "Blame jcnlk (/showme)",
        category: "Commands",
        subcategory: "Commands"
    })
    enableshowme = false;
   
    @SwitchProperty({
        name: "boom",
        description: "Blame jcnlk (/boom)",
        category: "Commands",
        subcategory: "Commands"
    })
    enableboom = false;

    ///// DEBUG /////
     @SwitchProperty({
        name: "Toggle Debug",
        description: "Enables debug features",
        category: "Debug",
        subcategory: "Debug"
    })
    debugmode = false;

     @SwitchProperty({
        name: "Send dig packet on click down",
        category: "Debug",
        subcategory: "Debug"
    })
    senddigpacket = false;
    
    
    constructor() {
        this.initialize(this);
        this.addDependency("Rotate Speed (in)", "Auto Impel");
        this.addDependency("Rotate Speed (out)", "Auto Impel");
        this.addDependency("No Rotate", "Auto Impel");
        this.addDependency("HP Threshold", "Auto Melon")

        this.addDependency("Custom Prefix Text", "Toggle Custom Prefix")

        

    }
}

export default new Config();