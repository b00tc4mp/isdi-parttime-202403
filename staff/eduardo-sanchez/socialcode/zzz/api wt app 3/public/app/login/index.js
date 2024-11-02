if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)

view.addClass('View')

const title = new Heading(1)
title.setText('Login')
title.onClick(function () {
    alert("By clicking on this title you wont get anything")

})

const loginForm = new LoginForm()

loginForm.onLoggedIn(() => setTimeout(() => location.href = '../home', 1000))

// loginForm.onLoggedIn(() => location.href = '../home')


const registerLink = new LinK()
registerLink.setText('Register')


registerLink.onClick(event => {
    event.preventDefault()

    setTimeout(function () {

        location.href = '../register'
    }, 500)

})

view.add(title)
view.add(loginForm)
view.add(registerLink)



