var view = new Component(document.body)

view.addClass('View')

var loginForm = new LoginForm()
var registerLink = new Link
registerLink.setText('Register')

// registerLink.setUrl('')
// registerLink.setTarget('_blank')

view.add(loginForm)
view.add(registerLink)


