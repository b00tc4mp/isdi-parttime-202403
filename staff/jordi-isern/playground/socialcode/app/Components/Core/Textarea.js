class Textarea extends Component{
    constructor(){
        super('textarea')

        this.addClass('Textarea')
    }

    setPlaceholder(placeholder) {
        this.container.placeholder = placeholder
    }

    getValue(){
        return this.container.value
    }
}