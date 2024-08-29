function Form() {
  Component.call(this, 'form')

  this.addClass('Form')
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form


Form.prototype.onSubmit = function (event) {
  this.container.addEventListener("submit", event)
}

Form.prototype.getUsername = function () {
  var username = this.container.querySelector("#username").value
  return username
}

Form.prototype.getPassword = function () {
  var userPassword = this.container.querySelector("#password").value
  return userPassword
}

Form.prototype.clear = function () {
  this.container.reset()
}
