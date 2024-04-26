// Creamos una instancia de Component y la asociamos al body del documento
var view = new Component(document.body)
view.addClass("View")

// Creamos un encabezado con nivel 1 y establecemos el texto como "REGISTER"
var headerRegister = new Header(1)
headerRegister.setText("REGISTER")
headerRegister.onClick(function (event) {
  event.preventDefault()
  alert("Click en el registro")
})

// Creamos una instancia de la clase RegisterComponent
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
    registerForm.setFeedback("User registered", "sucess")
  } catch (error) {
    //alert(error.message)
    registerForm.setFeedback(error.message)
  }
})

// Creamos un enlace para redirigir al usuario al inicio de sesión
var loginLink = new Link()
loginLink.setText("Login")
// loginLink.setTarget("_blank")

// Configuramos un evento onclick para redirigir al usuario al inicio de sesión
loginLink.onClick(function (event) {
  event.preventDefault() // Prevenimos el comportamiento predeterminado del enlace
  console.log("...en espera de 1 segundo ⌛")
  setTimeout(function () {
    location.href = "../login" // Redireccionamos al usuario al inicio de sesión después de 1 segundo
  }, 1000)
})

// Agregamos los elementos al componente principal
view.add(headerRegister)
view.add(registerForm)
view.add(loginLink)
