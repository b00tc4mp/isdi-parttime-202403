class Confirm extends Component {
    constructor() {
        super('div')

        this.addClass('Confirm')

        const question = new Component('p')

        this.question = question

        const cancelButton = new Button('Cancel')

        cancelButton.onClick(() => this.onCancelListener())

        const confirmButton = new Button('Confirm')
        confirmButton.onClick(() => this.onConfirmListener())

        this.add(question)
        this.add(cancelButton)
        this.add(confirmButton)
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