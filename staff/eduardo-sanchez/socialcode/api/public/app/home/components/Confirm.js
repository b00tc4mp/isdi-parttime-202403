class Confirm extends Component {
    constructor() {
        super('div') //TODO make it a dialog

        this.addClass('Confirm')

        const question = new Component('p')

        this.question = question

        const cancelButton = new Button('Cancel')

        cancelButton.onClick(() => this.onCancelListener())

        const comfirmButton = new Button('Confirm')

        comfirmButton.onClick(() => this.onConfirmListener())

        this.add(question)
        this.add(cancelButton)
        this.add(comfirmButton)

    }

    setText(text) {
        this.question.setText(text)

    }

    onCancel(listener) {
        this.onCancelListener = listener
    }

    onConfirm(listener) {
        this.onConfirmListener = listener
    }
}