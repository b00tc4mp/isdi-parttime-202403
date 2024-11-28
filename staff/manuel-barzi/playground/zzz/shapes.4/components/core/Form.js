function Form() {
    Component.call(this, 'form')

    this.addClass('Form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form