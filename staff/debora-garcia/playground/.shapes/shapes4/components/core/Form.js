function Form() {
    Component.call(this, "form")

    //this.container.classList.add("Form")
    this.addClass("Form")
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.onSubmit = function (listener) {
    this.container.addEventListener("submit", listener)
}

Form.prototype.clear= function(){
    this.container.reset()
}