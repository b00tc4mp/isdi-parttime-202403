if (!logic.isUserLoggedIn())
    location.href = '../login'

var view = new Component(document.body)
view.addClass('view')

var userName = logic.getUserName()

var usernameTitle = new Heading(3)
usernameTitle.setText(userName)

view.add(usernameTitle)

var logoutButton = new Button()
logoutButton.setText('Logout')

logoutButton.onClick(function () {
    logic.logoutUser()

    location.href = '../login'
})

view.add(logoutButton)

var pingPong = new PingPong()

view.add(pingPong)
