class Button extends Component {
    constructor(text) {
        super("button")

        this.addClass("Button")

        if (text) this.setText(text)

        //añadimos text en constructor para que sea ocional y si existe que lo escriba 
    }
    setType(type) {
        this.container.type = type
    }

} 
