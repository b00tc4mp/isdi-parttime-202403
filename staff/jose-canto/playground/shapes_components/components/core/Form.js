function Form() {
  Component.call(this, 'form')

  this.addClass('Form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.onSubmit = function (listener) {
  this.container.addEventListener("submit", listener)
}

// clear para resetear el formulario
Form.prototype.clear = function () {
  this.container.reset()
}

Form.prototype.getUsername = function () {
  var userName = this.container.querySelector("#username").value
  return userName
}

Form.prototype.getPassword = function () {
  var userPassword = this.container.querySelector("#password").value
  return userPassword
}