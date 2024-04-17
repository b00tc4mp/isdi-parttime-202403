// Creamos una instancia de la clase Component y le pasamos el elemento body del documento como argumento
var view = new Component(document.body)

// Creamos una instancia de la clase Form
var form = new Form()

// Creamos una instancia de la clase Label para el campo de nombre de usuario
var userNameLabel = new Label() // En las constructoras si no se le pasan argumentos, se crean vacías
userNameLabel.setText("Nombre de usuario: ")

// Creamos una instancia de la clase Label para el campo de contraseña
var passwordLabel = new Label()
passwordLabel.setText("Contraseña: ")

// Creamos una instancia de la clase Input para el campo de nombre de usuario
var userNameInput = new Input
userNameInput.setText("")

// Creamos una instancia de la clase Input para el campo de contraseña
var passwordInput = new Input
passwordInput.setText("")

var submitButton = new Button
submitButton.setText("Iniciar sesión")

// Agregamos los elementos al formulario
form.add(userNameLabel)
form.add(userNameInput)
form.add(passwordLabel)
form.add(passwordInput)
form.add(submitButton)

// Agregamos el formulario a la vista
view.add(form)