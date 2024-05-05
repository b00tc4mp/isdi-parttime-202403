if (!logic.isUserLoggedIn())// si no ha hecho login no te deje acceder al juego
    location.href = "../login"

const view = new Component(document.body)
view.addClass("View")
const userName = logic.getUserName()

const userNameTitle = new Heading(3)
userNameTitle.setText(userName)

view.add(userNameTitle)
const logoutButton = new Button
logoutButton.setText("Logout")
logoutButton.addClass("logoutButton")

logoutButton.onClick(() => {
    logic.logoutUser()

    
    location.href = "../login"
})



view.add(logoutButton)



