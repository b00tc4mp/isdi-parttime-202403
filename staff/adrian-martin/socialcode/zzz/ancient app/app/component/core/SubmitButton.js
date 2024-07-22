class SubmitButton extends Button{
    constructor(text){
        super(text)

        this.addClass('SubmitButton')

        this.setType('submit')
    }
}