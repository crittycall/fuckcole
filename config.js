import { @Vigilant, @SwitchProperty, @TextProperty, @SliderProperty, @ButtonProperty, @SelectorProperty } from "Vigilance";

@Vigilant("Fuckcole", "Fuckcole")

class Config {
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
    
    constructor() {
        this.initialize(this);

    }
}

export default new Config();