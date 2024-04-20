var loginForm = new LoginForm()
document.body.appendChild(loginForm.container)

var link = new Link()
link.setUrl('../register/index.html')
link.setTarget('_blank')
link.setText('Register')
document.body.appendChild(link.container)
