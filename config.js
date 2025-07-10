
import { 
    @Vigilant, 
    @SwitchProperty, 
    @TextProperty, 
    @SliderProperty, 
    @ButtonProperty, 
    @SelectorProperty } from "Vigilance";

@Vigilant("Criticall", "Criticall", {
    getCategoryComparator: () => (a, b) => {
        const order = ["General", "Dungeons", "F7/M7", "HUD"];
        return order.indexOf(a.name) - order.indexOf(b.name);
    }
})

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