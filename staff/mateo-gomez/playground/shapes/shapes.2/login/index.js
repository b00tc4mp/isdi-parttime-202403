var view = new Component(document.body)

var loginForm = new LoginForm
var registerLink = new Link
registerLink.setText('Register')
registerLink.setUrl('https:www.google.com')

view.add(loginForm)
view.add(registerLink)
