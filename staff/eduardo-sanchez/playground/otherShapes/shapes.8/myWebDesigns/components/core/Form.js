function Form() {
    Component.call(this, 'form')

    this.addClass('Form')

}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.onSubmit = function (event) {
    this.container.addEventListener('submit', event)
}

Form.prototype.clear = function () {
    this.container.reset()
}