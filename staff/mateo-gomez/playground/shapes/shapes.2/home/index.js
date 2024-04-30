if (!logic.isUserLoggedIn())
    location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const usernameTitle = new Heading(1)
usernameTitle.setText('Login')
usernameTitle.onClick(function (event) {
    alert('¡Esto no es un botón!\nIntroduce tus datos de inicio de sesión más abajo 🤪')
})

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