function Input() {
    Component.call(this, 'input')

    this.addClass('Input')
}

Input.prototype = Object.create(Component.prototype)
Input.prototype.constructor = Input

Input.prototype.setType = function (type) {
    this.container.type = type
}