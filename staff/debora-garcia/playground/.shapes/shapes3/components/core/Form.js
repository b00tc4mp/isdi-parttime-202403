function Form() {
    Component.call(this, "form")

    //this.container.classList.add("Form")
    this.addClass("Form")
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form