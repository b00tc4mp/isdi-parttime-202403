class TextArea extends Component {
    constructor() {
        super('textarea')

        this.addClass('TextArea')
    }
    setPlaceholder(placeholder) {
        this.container.placeholder = placeholder
    }
    getValue() {
        const description = this.container.value
        return description
    }
}

class DescriptionField extends Component {
    constructor(id, text) {
        super()

        this.addClass('DescriptionField')

        const label = new Label
        label.setText(text)
        label.setFor(id)

        const description = new TextArea
        description.setId(id)
        description.setPlaceholder('Description..')
        description.addClass('DescriptionInput')

        this.add(label)
        this.add(description)
    }

    getDescription() {
        const description = this.children[1]
        return description.getValue()
    }
}