var view = new Component(document.body)

var headerLogin = new Header(1)
headerLogin.setText("REGISTER")

var registerForm = new LoginComponent()

var loginLink = new Link()
loginLink.setText("Login")
loginLink.setUrl("../login/index.html")


view.add(headerLogin)
view.add(registerForm)
view.add(loginLink)