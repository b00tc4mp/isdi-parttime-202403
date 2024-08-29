var view = new Component(document.body)
view.addClass("View")

// H1
var header = new Header(1)
header.setText("REGISTER SNAKE 🐍")

header.onClick(function () {
  alert("BOOOOOM....💣💣💣")
})

// FORM
var registerForm = new RegisterComponent()

// Escuchamos el evento submit del formulario de registro
registerForm.onSubmit(function (event) {
  event.preventDefault() // Prevenimos el comportamiento predeterminado del formulario

  // Obtenemos los datos del formulario de registro
  var email = registerForm.getEmail()
  var username = registerForm.getUsername()
  var password = registerForm.getPassword()
  var passwordRepeat = registerForm.getPasswordRepeat()

  try {

    logic.registerUser(email, username, password, passwordRepeat)

    registerForm.clear()

    setTimeout(function () {
      location.href = "../login"
    })

  } catch (error) {
    if (error instanceof ContentError) {
      //alert(error.message)
      registerForm.setFeedback(error.message + ", correct it")
    } else if (error instanceof MatchError) {
      registerForm.setFeedback(error.message + ", please, retype them")

    } else if (error instanceof DuplicityError) {
      registerForm.setFeedback(error.message + ", enter new one")

    } else {
      registerForm.setFeedback("sorry, ther was an error, please try again later")
    }

    setTimeout(function () {
      registerForm.setFeedback("")
    }, 2000)
  }
})

// Login Link
var loginLink = new Link()
loginLink.setText("Login")

logic.loginLink()

// ADD ELEMENT AT PRINCIPAL COMPONENT
view.add(header)
view.add(registerForm)
view.add(loginLink)