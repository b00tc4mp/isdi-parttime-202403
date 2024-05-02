class Input extends Component {
    constructor() {
        super('input')

        this.addClass('Input')
    }

    setType(type) {
        this.container.type = type
    }

    setPlaceholder(placegholder) {
        this.container.placeholder = placeholder
    }

    getValue() {
        return this.container.value
    }
}