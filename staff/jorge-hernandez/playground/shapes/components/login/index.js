var view = new Component(document.body)
view.addClass('View')
var loginForm = new LoginForm()
view.add(loginForm)

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

loginForm.onSubmit(function (event) {
  event.preventDefault()
  var username = loginForm.getUsername()
  var password = loginForm.getPassword()
  try {
    logic.loginUser(username, password)
  } catch (error) {
    if (error instanceof ContentError) {
      loginForm.setFeedback(error.message + ', porfavor corrígelo')
      var link = new Link()
      link.setUrl('../register/index.html')
      link.setTarget('_blank')
      link.setText('¿olvidaste tu contraseña?')
      link.addClass('forgot-pass')
      loginForm.add(link)
    } else if (error instanceof MatchError) {
      loginForm.setFeedback('error de credenciales')
    } else {
      loginForm.setFeedback(
        'Perdón, hay un error, lo solucionaremos lo antes posible'
      )
    }
  }
})

var link = new Link()
link.setUrl('../register/index.html')
link.setTarget('_blank')
link.setText('Register')
view.add(link)
