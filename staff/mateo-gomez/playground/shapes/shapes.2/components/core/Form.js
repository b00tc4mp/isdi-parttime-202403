function Form() {
    Component.call(this, 'form')

    this.container.classList.add('Form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form