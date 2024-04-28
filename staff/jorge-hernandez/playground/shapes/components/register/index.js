var view = new Component(document.body)
view.addClass('View')
var registerForm = new RegisterForm()
view.add(registerForm)

//onclick password
var icon = document.getElementById('icon')
var passField = document.getElementById('password')
icon.onclick = function () {
  showPass(icon, passField, 'password', 'text')
}

var icon2 = document.getElementById('icon2')
var passField2 = document.getElementById('repeat-password')
icon2.onclick = function () {
  showPass(icon2, passField2, 'password', 'text')
}

registerForm.onSubmit(function (event) {
  event.preventDefault()
  var email = registerForm.getEmail()
  var username = registerForm.getUsername()
  var password = registerForm.getPassword()
  var repeatPassword = registerForm.getRepeatPassword()

  try {
    logic.registerUser(email, username, password, repeatPassword)
  } catch (error) {
    if (error instanceof ContentError) {
      registerForm.setFeedback(error.message + ', corrígelo')
      setTimeout(function () {
        registerForm.setFeedback('')
      }, 2000)
    } else if (error instanceof MatchError) {
      registerForm.setFeedback('Error de credenciales')
      setTimeout(function () {
        registerForm.setFeedback('')
      }, 2000)
    } else if (error instanceof DuplicityError) {
      registerForm.setFeedback('usuario ya existe')
      setTimeout(function () {
        registerForm.setFeedback('')
      }, 2000)
    } else {
      registerForm.setFeedback(
        'Hay un error lo solucionaremos lo antes posible'
      )
    }
  }
})

var link = new Link()
link.setUrl('../login/index.html')
link.setTarget('_blank')
link.setText('Login')
view.add(link)
