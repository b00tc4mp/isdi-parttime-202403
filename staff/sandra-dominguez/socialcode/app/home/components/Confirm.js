class Confirm extends Component {
    constructor() {
        super('div')

        this.addClass('Confirmar')

        const question = new Component('p')

        this.question = question

        const cancelButton = new Button('Cancelar')

        cancelButton.onClick(() => this.onCancelListener())

        const confirmButton = new Button('Confirmar')

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