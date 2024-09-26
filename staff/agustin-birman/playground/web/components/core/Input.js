class Input extends Component {
    constructor() {
        super('input')

        this.addClass('Input')
    }

    setType(type) {
        this.container.type = type
    }

    setPlaceholder(placeHolder) {
        this.container.placeholder = placeHolder
    }

    getValue() {
        return this.container.value
    }
}