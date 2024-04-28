var view = new Component(document.body)
view.addClass('View')
var registerForm = new RegisterForm()
view.add(registerForm)

//onclick password
var icon = document.getElementById('icon')
var passField = document.getElementById('password')

icon.onclick = function showPass() {
  if (passField.type === 'password') {
    passField.type = 'text'
    icon.classList.add('fa-eye')
    icon.classList.remove('fa-eye-slash')
  } else if (passField.type === 'text') {
    passField.type = 'password'
    icon.classList.add('fa-eye-slash')
    icon.classList.remove('fa-eye')
  }
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
      registerForm.setFeedback(error.message + ', porfavor corrígelo')
    } else if (error instanceof MatchError) {
      registerForm.setFeedback('Error de credenciales')
    } else if (error instanceof DuplicityError) {
      registerForm.setFeedback('usuario ya existe')
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
