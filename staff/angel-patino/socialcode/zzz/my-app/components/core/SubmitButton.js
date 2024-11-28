class SubmitButton extends Button {
    constructor(text) {
        super(text)

        this.addClass('SubmiButton')

        this.setType('submit')
    }
}