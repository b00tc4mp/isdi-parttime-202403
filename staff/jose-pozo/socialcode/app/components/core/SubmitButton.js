class SubmitButton extends Button {
    constructor(text) {
        super()

        this.addClass('submitButton')

        this.setType('submit')
        this.setText(text)
    }
}