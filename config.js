import { @Vigilant, @SwitchProperty, @TextProperty, @SliderProperty, @ButtonProperty, @SelectorProperty } from "Vigilance";

@Vigilant("Fuckcole", "§aFuckcole§r", {
 getCategoryComparator: () => (a, b) => {
        const order = ["Settings", "Riftstalker", "Debug"];
        return order.indexOf(a.name) - order.indexOf(b.name);
    }

}) // schizo color sooo cool ik

class Config {
    ///// RIFTSTALKER /////
    @SwitchProperty({
        name: "Toggle Auto Impel",
        description: "Enables Auto Impel",
        category: "Riftstalker",
        subcategory: "Auto Impel"
    })
    toggleImpel = false;

    @SwitchProperty({
        name: "No Rotate",
        description: "Makes autoimpel serversided (risky cuz crit can't code)",
        category: "Riftstalker",
        subcategory: "Auto Impel"
    })
    noRotate = false;

    @SwitchProperty({
        name: "Auto ice",
        description: "Automatically uses holy ice for twinclaws (doesnt 0 tick any more aka gives u 30d break)",
        category: "Riftstalker",
        subcategory: "Automation"
    })
    autoice = false;

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

    @SwitchProperty({
        name: "Show Me",
        description: "Blame jcnlk (/showme)",
        category: "Settings",
        subcategory: "Commands"
    })
    enableshowme = false;
   
    @SwitchProperty({
        name: "boom",
        description: "Blame jcnlk (/boom)",
        category: "Settings",
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
    
    @TextProperty({
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

        this.addDependency("No Rotate", "Toggle Auto Impel");
        this.addDependency("Change Debug Text", "Toggle Debug")
        //this.addDependency("Shorten Prefix", "Toggle Custom Prefix")
        this.addDependency("Custom Prefix Text", "Toggle Custom Prefix")
    }
}

export default new Config();