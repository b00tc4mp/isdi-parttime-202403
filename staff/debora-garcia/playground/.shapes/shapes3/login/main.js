var view = new Component(document.body)

var loginForm=new LoginForm
//var loginForm2= new LoginForm

/* var form = new Form()
form.addClass("LoginForm") // de esta manera hereda los estilos de Form y se agrega otra personaliada de "loginForm"

var usernameLabel = new Label()
usernameLabel.setText("Username")
usernameLabel.setFor("username")

var usernameInput = new Input()
usernameInput.setId("username")

var passwordLabel = new Label()
passwordLabel.setText("Password")
passwordLabel.setFor("password")

var passwordInput = new Input()
passwordInput.setId("password")
passwordInput.setType("password")

var submitButton = new Button()
submitButton.setText("Register")


form.add(usernameLabel)
form.add(usernameInput)

form.add(passwordLabel)
form.add(passwordInput)

form.add(submitButton) */

//view.add(form)//document.body.appendChild(form.container)

view.add(loginForm)

//view.add(loginForm2)