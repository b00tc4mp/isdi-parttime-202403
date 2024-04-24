var view = new Component(document.body)
view.addClass('View')
var registerForm = new RegisterForm()
view.add(registerForm)
registerForm.onSubmit(function (event) {
  event.preventDefault()
  var email = registerForm.getEmail()
  var username = registerForm.getUsername()
  var password = registerForm.getPassword()
  var repeatPassword = registerForm.getRepeatPassword()

  try {
    logic.registerUser(email, username, password, repeatPassword)
  } catch (error) {
    registerForm.setFeedback(error.message)
  }
})

var link = new Link()
link.setUrl('../login/index.html')
link.setTarget('_blank')
link.setText('Login')
view.add(link)
