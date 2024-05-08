class Button extends Component {
    constructor(text) {
        super('button')
        this.addClass('Button')

        if (text) this.setText(text)
    }

    setType(type) {
        this.container.type = type
    }
}