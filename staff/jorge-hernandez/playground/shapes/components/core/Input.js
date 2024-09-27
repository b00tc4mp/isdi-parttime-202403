function Input() {
  Component.call(this, 'input')
}

Input.prototype = Object.create(Component.prototype)
Input.prototype.constructor = Input

Input.prototype.setId = function (id) {
  this.container.id = id
}
Input.prototype.setType = function (type) {
  this.container.type = type
}
Input.prototype.getValue = function () {
  return this.container.value
}

Input.prototype.setPlaceholder = function (placeholder) {
  this.container.placeholder = placeholder
}
