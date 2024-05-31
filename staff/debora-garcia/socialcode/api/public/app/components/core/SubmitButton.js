//TODO cambiar nombre a SubmitButton
class SubmitButton extends Button {
    constructor(text) {
        super(text)
        //añadimos text en la clase superior y como viene heredado de Button, añadira el texto
        
        this.addClass("SubmitButton")

        this.setType("submit")
    }
}