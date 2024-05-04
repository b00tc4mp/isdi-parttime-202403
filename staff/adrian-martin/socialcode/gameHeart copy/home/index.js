// if(!logic.isUserLoggedIn())
//     location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const userName = logic.getUsername()

const usernameTitle = new Heading(3)
usernameTitle.setText(userName)

const logoutButton = new Button
logoutButton.setText('Logout')

logoutButton.onClick( () => { 
    logic.logoutUser()

    location.href = '../login'
})

view.add(logoutButton)
view.add(usernameTitle)

