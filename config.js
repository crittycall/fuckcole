import { @Vigilant, @SwitchProperty, @TextProperty, @SliderProperty, @ButtonProperty, @SelectorProperty } from "Vigilance";

@Vigilant("Fuckcole", "Fuckcole")

class Config {
   /////////////riftstalker/////////////
    @SwitchProperty({
    name: "Auto Impel",
        description: "Automatically impels for you (gg)",
        category: "Riftstalker",
        subcategory: "Category"
    })
    impel = false
    @SwitchProperty({
     name: "Auto ice",
        description: "DUDE CHILL note: sends ban packet until i fix it or something idk",
        category: "Riftstalker",
        subcategory: "Category"
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
    constructor() {
        this.initialize(this);

    }
}

export default new Config();