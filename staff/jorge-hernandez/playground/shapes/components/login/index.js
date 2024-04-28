var view = new Component(document.body)
view.addClass('View')
var loginForm = new LoginForm()
view.add(loginForm)
var linkCreated = false

//onclick password
var icon = document.getElementById('icon')
var passField = document.getElementById('password')

icon.onclick = function () {
  showPass(icon, passField, 'password', 'text')
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
      setTimeout(function () {
        loginForm.setFeedback('')
      }, 2000)
      if (!linkCreated) {
        var link = new Link()
        link.setUrl('../register/index.html')
        link.setTarget('_blank')
        link.setText('¿olvidaste tu contraseña?')
        link.addClass('forgot-pass')
        loginForm.add(link)
        linkCreated = true
      }
    } else if (error instanceof MatchError) {
      loginForm.setFeedback('error de credenciales')
      loginForm.setFeedback(function () {
        loginForm.setFeedback('')
      })
    } else {
      loginForm.setFeedback('Hay un error, lo solucionaremos lo antes posible')
    }
  }
})

var link = new Link()
link.setUrl('../register/index.html')
link.setTarget('_blank')
link.setText('Register')
view.add(link)
