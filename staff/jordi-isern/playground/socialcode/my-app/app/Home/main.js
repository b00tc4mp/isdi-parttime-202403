if(!logic.isUserLoggedIn()){
    location.href = '../login'
}

const view = new Component(document.body)
view.addClass('View')

const logoutButton = new Button
logoutButton.addClass("fa-solid")
logoutButton.addClass("fa-arrow-right-from-bracket")

logoutButton.onClick(() => {
    logic.logOutUser()

    location.href = '../login'
})

const userName = logic.getUserName()

const usernameTitle = new Heading(3)
usernameTitle.setText(userName)

view.add(usernameTitle)

view.add(logoutButton)