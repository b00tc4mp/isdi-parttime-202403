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
const loginPad = new Component('p')
loginPad.setText = 'Hola'
loginPad.addClass('loginPad')

view.add(loginPad)
view.add(logoutButton)