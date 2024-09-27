function Button() {
  Component.call(this, 'button')
  this.addClass('Button')
}

Button.prototype = Object.create(Component.prototype)
Button.prototype.constructor = Button
Button.prototype.setType = function (type) {
  this.container.type = type
}
Button.prototype.onClick = function (callback) {
  this.container.onclick = callback
}
