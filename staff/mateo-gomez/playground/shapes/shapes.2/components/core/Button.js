function Button() {
    Component.call(this, 'button')

    this.addClass('Buttom')
}

Button.prototype = Object.create(Component.prototype)
Button.prototype.constructor = Button

Button.prototype.setType = function (type) {
    this.container.type = type
}

