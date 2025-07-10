import { @Vigilant, @SwitchProperty, @TextProperty, @SliderProperty, @ButtonProperty, @SelectorProperty } from "Vigilance";

@Vigilant("Criticall", "Criticall")

class Config {
    @SwitchProperty({
    name: "Auto Impel",
        description: "",
        category: "Riftstalker",
        subcategory: "Category"
    })
    impel = false
    constructor() {
        this.initialize(this);

    }
}

export default new Config();