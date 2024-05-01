class SubmitButton extends Button{
    constructor(text){
    super()

    this.addClass('SubmitButton')

    this.setType('submit')
    this.setText(text)
    }
}