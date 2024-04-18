function Form() {
    Component.call(this, 'form')

    this.addClass('form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form