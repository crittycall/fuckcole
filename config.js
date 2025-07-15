import { @Vigilant, @SwitchProperty, @TextProperty, @SliderProperty, @ButtonProperty, @SelectorProperty } from "Vigilance";

@Vigilant("Fuckcole", "§aFuckcole§r", {
 getCategoryComparator: () => (a, b) => {
        const order = ["Settings", "Commands", "Slayer", "Debug"];
        return order.indexOf(a.name) - order.indexOf(b.name);
    }

}) // schizo color sooo cool ik

class Config {
    ///// RIFTSTALKER /////
      @SwitchProperty({
        name: "Vampire Nuke",
        description: "",
        category: "Slayer",
        subcategory: "Riftstalker"
    })
    toggleVampireNuke = false;

    @SwitchProperty({
        name: "Auto Impel",
        description: "",
        category: "Slayer",
        subcategory: "Riftstalker"
    })
    toggleImpel = false;
    
    @SliderProperty({
        name: "Rotate Speed (in)",
        description: "Speed is in ms; does not apply to no rotate (lower ms = riskier)",
        category: "Slayer",
        subcategory: "Riftstalker",
        min: 50,
        max: 500
    })
     impelSpeedIn = 100;

     @SliderProperty({
        name: "Rotate Speed (out)",
        description: "Speed is in ms; does not apply to no rotate (lower ms = riskier)",
        category: "Slayer",
        subcategory: "Riftstalker",
        min: 50,
        max: 500
    })
     impelSpeedOut = 100;

    @SwitchProperty({
        name: "No Rotate",
        description: "Makes auto impel serversided (risky cuz crit can't code)",
        category: "Slayer",
        subcategory: "Riftstalker"
    })
    noRotate = false;

    @SwitchProperty({
        name: "Auto Melon",
        description: "",
        category: "Slayer",
        subcategory: "Riftstalker"
    })
    automelon = false;

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
    
   /** @TextProperty({
        name: "Change Debug Text",
        description: "",
        category: "Debug",
        subcategory: "Debug"
    })
    debugtext = ""
    /////////////parakeet/////////////
   /**@TextProperty({
        name: "Parakeet Message",
        description: "Repeat any message in chat (This is extremly schizo idk why anyone would ever use this)",
        category: "Parakeet",
        subcategory: "Category"
    })
    parakeetMessage = "";
   */
    constructor() {
        this.initialize(this);
        this.addDependency("Auto Impel", "Vampire Nuke")
        this.addDependency("No Rotate", "Auto Impel");
        this.addDependency("Rotate Speed (in)", "Auto Impel")
        this.addDependency("Rotate Speed (out)", "Auto Impel")
        this.addDependency("Auto Melon", "Vampire Nuke")
        this.addDependency("Custom Prefix Text", "Toggle Custom Prefix")

    }
}

export default new Config();