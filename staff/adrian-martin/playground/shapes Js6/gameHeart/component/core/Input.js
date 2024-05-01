class Input extends Component{
    constructor(){
    super('Input')

    this.addClass('Input')
    }

    setType(type) {
        this.container.type = type
    }

    setPlaceholder(placeholder) {
        this.container.placeholder = placeholder
    }
    
    getValue() {
        return this.container.value
    }
}