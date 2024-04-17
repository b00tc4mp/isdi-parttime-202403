function Button() {
  Component.call(this, "button")
}

Button.prototype = Object.create(Component.prototype)
Button.prototype.constructor = Button