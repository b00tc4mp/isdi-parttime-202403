if(!logic.isUserLoggedIn()){
    location.href = '../login'
}

var view = new Component(document.body)
view.addClass('View')

var logoutButton = new Button
logoutButton.addClass("fa-solid")
logoutButton.addClass("fa-arrow-right-from-bracket")

logoutButton.onClick(function(){
    logic.logOutUser()

    location.href = '../login'
})
var loginPad = new Component('p')
loginPad.setText = 'Hola'
loginPad.addClass('loginPad')

view.add(loginPad)
view.add(logoutButton)