function Button() {
    Component.call(this, 'button')

    this.addClass('button')
}

Button.prototype = Object.create(Component.prototype)
Button.prototype.contructor = Button

Button.prototype.setType = function(type) {
    this.container.type = type
}