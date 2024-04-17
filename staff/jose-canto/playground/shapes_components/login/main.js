// Creamos una instancia de la clase Component y le pasamos el elemento body del documento como argumento
var view = new Component(document.body)

var loginCompoenent = new LoginComponent()
var loginCompoenent2 = new LoginComponent()

view.add(loginCompoenent)
view.add(loginCompoenent2)



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