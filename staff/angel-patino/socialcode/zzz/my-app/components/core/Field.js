class Field extends Component {
    constructor(id, type, text) {
        super('div')

        this.addClass('Field')

        const label = new Label
        label.setFor(id)
        label.setText(text)

        const input = new Input


    }
}