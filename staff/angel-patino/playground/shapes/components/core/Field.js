class Field extends Component {
    constructor(id, type, text) {
        super('div')

    this.addClass('Field')

    const label = new Label
    label.setText(text)
    label.setFor(id)

    const input = new Input
    input.setId(id)
    input.setType(type)

    this.add(label)
    this.add(input)
    }


     setPlaceholder(placeholder) {
        this.children[1].setPlaceholder(placeholder)
    }

    getValue() {
    const input = this.children[1]

    return input.getValue()
    }   
}