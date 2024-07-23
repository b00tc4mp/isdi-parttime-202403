class FieldTextarea extends Component {
    constructor(id, text){
        super('div')

        this.addClass('FieldTextarea')

        var label = new Label
        label.setText(text)
        label.setFor(id)

        var divTextarea = new Component('div')
        divTextarea.addClass('divTextarea')

        var textarea = new Textarea
        textarea.setId(id)
        textarea.addClass('textarea')

        this.add(label)
        this.add(divTextarea)
        divTextarea.add(textarea)
    }

    setPlaceholder(placeholder){
        this.children[1].children[0].setPlaceholder(placeholder)
    }
    
    getValue(){
        var input = this.children[1].children[0]
        return input.getValue()
    }
}