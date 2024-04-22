var view = new Component(document.body)

view.addClass('View')

var loginForm = new LoginForm()
var registerLink = new Link
registerLink.setText('Register')

// registerLink.setUrl('')
// registerLink.setTarget('_blank')
var player1 = new PlayerLoginRegister()
player1.setX(300)
player1.setY(330)

var player2 = new PlayerLoginRegister()
player2.setColor('black')
player2.setX(870)
player2.setY(330)


// view.add(player2)
// view.add(player1)
view.add(loginForm)
view.add(registerLink)


