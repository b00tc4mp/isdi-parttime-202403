function CheckPasswordField(id, type, text) {
  Component.call(this, "div")

  this.addClass("Field")


  var icon = new Component("i")
  icon.addClass("fa-regular")
  icon.addClass("fa-eye")


  var label = new Label()
  label.setText(text)
  label.setFor(id)

  var input = new Input()
  input.setId(id)
  input.setType(type)


  var showPassword = true

  icon.onClick(function () {
    showPassword = !showPassword

    if (!showPassword) {
      icon.removeClass("fa-eye")
      icon.addClass("fa-eye-slash")
      input.setType("text")
    } else {
      icon.removeClass("fa-eye-slash")
      icon.addClass("fa-eye")
      input.setType("password")
    }
  })


  this.add(label)
  this.add(input)
  this.add(icon)
}
CheckPasswordField.prototype = Object.create(Component.prototype)
CheckPasswordField.prototype.constructor = CheckPasswordField

CheckPasswordField.prototype.setPlaceholder = function (placeholder) {
  this.children[1].setPlaceholder(placeholder)
}

CheckPasswordField.prototype.getValue = function () {
  var input = this.children[1]
  return input.getValue()
}
