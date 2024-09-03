class Input extends Component {
    constructor() {
        super('input')

        this.addClass('Input')
    }

    setType() {
        this.container.type = type
    }

    setPlaceHolder(placeholder) {
        this.container.placeholder = placeholder
    }

    getValue() {
        return this.container.value
    }
}