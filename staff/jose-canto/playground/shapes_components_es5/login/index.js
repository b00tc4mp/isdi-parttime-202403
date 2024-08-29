if (logic.isUserLoggedIn()) {
  location.href = "../home";
}

// Creamos una instancia de la clase Component y le pasamos el elemento body del documento como argumento
var view = new Component(document.body)
view.addClass("View")

var headerLogin = new Header(1)
headerLogin.setText("LOGIN")

var loginForm = new LoginComponent()
loginForm.onSubmit(function (event) {
  event.preventDefault()

  var username = loginForm.getUsername()

  var password = loginForm.getPassword()

  try {
    logic.loginUser(username, password)

    loginForm.clear()

    loginForm.setFeedback("User logged in ✅", "success")

    setTimeout(function () {
      location.href = '../home'
    }, 1000)

  } catch (error) {
    //alert(error.message)
    if (error instanceof ContentError) {
      loginForm.setFeedback(error.message + ", please, correct it")

    } else if (error instanceof MatchError) {
      loginForm.setFeedback("Wrong credentials ❌")
      setTimeout(function () {
        loginForm.setFeedback("")
      }, 2000)

    } else {
      loginForm.setFeedback("Please try again later 💤")
    }
  }
})

var registerLink = new Link()
registerLink.setText("Register")
registerLink.setUrl("../register/index.html")
// registerLink.setTarget("_blank")

registerLink.onClick(function (event) {
  event.preventDefault()
  console.log("...en espera de 1 segundo ⌛")
  setTimeout(function () {
    location.href = "../register"
  }, 1000)
})


view.add(headerLogin)
view.add(loginForm)
view.add(registerLink)


/* Esto lo movemos a LoginComponent.js, lo creamos como componente para poder ser reutilizado
// Creamos una instancia de la clase Form
var form = new Form()
//form.removeClass("Form") // Eliminamos la clase "Form"
form.addClass("LoginForm")

// Creamos una instancia de la clase Label para el campo de nombre de usuario
var usernameLabel = new Label() // En las constructoras si no se le pasan argumentos, se crean vacías
usernameLabel.setText("Username: ")
usernameLabel.setFor("username")

// Creamos una instancia de la clase Label para el campo de contraseña
var passwordLabel = new Label()
passwordLabel.setText("Contraseña: ")
passwordLabel.setFor("password")

// Creamos una instancia de la clase Input para el campo de nombre de usuario
var userNameInput = new Input
userNameInput.setId("username")

// Creamos una instancia de la clase Input para el campo de contraseña
var passwordInput = new Input
passwordInput.setText("")
passwordInput.setId("password")
passwordInput.setType("password")

var submitButton = new Button
submitButton.setText("Iniciar sesión")
submitButton.setType("submit")

// Agregamos los elementos al formulario
form.add(usernameLabel)
form.add(userNameInput)
form.add(passwordLabel)
form.add(passwordInput)
form.add(submitButton)

// Agregamos el formulario a la vista
view.add(form)

*/