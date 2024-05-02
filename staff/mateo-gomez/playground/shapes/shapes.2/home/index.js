if (!logic.isUserLoggedIn())
    location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const userName = logic.getUserName()

const usernameTitle = new Heading(3)
usernameTitle.setText(userName)


view.add(usernameTitle)

const logoutButton = new Button
logoutButton.setText('Logout')

logoutButton.onClick(() => {
    logic.logoutUser()

    location.href = '../login'
})



view.add(logoutButton)

const duck = new Duck()
duck.config('ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight')
duck.move(100, 100, 0)