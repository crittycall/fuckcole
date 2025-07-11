import { @Vigilant, @SwitchProperty, @TextProperty, @SliderProperty, @ButtonProperty, @SelectorProperty } from "Vigilance";

@Vigilant("Fuckcole", "Fuckcole")

class Config {
   /////////////riftstalker/////////////
    @SwitchProperty({
    name: "Toggle Auto Impel",
        description: "Enables Auto Impel",
        category: "Riftstalker",
        subcategory: "Auto Impel"
    })
    toggleImpel = false
    @SwitchProperty({
    name: "No Rotate",
        description: "Makes autoimpel serversided (risky)",
        category: "Riftstalker",
        subcategory: "Auto Impel"
    })
    noRotate = false
    @SwitchProperty({
     name: "Auto ice",
        description: "Automatically uses holy ice for twinclaws (doesnt 0 tick any more gg)",
        category: "Riftstalker",
        subcategory: "Automation"
    })
    autoice = false
    /////////////fuckcole settings/////////////
    @SwitchProperty({
    name: "Shorten Prefix",
        description: "Shorten prefix from fuckcole to fc",
        category: "Settings",
        subcategory: "Category"
    })
    shortenprefix = false
    /////////////parakeet/////////////
   @TextProperty({
    name: "Parakeet Message",
        description: "Repeat any message in chat",
        category: "Parakeet",
        subcategory: "Category"
    })
   text = ""
   
    constructor() {
        this.initialize(this);
this.addDependency("No Rotate", "Toggle Auto Impel");


    }
}

export default new Config();
