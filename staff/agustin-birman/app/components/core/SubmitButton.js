class SubmitButton extends Button {
    constructor(text) {
        super()

        this.addClass('SubmitButton')

        this.SetType('submit')
        this.setText(text)
    }
}