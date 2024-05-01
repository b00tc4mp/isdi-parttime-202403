class Field extends Component{
    constructor(id, type,text){

        super('div')

        this.addClass('Field')

        var label = new Label
        label.setText(text)
        label.setFor(id)
        
        var divInput = new Component('div')
        divInput.addClass('divInput')
        
        var input = new Input
        input.setId(id)
        input.addClass('input')
        input.setType(type)

        this.add(label)
        this.add(divInput)
        divInput.add(input)
    }

    setPlaceholder(placeholder){
        this.children[1].children[0].setPlaceholder(placeholder)
    }

    getValue(){
        var input = this.children[1].children[0]
        return input.getValue()
    }
}