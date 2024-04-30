var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Home')

var buttonGame = new Button()
buttonGame.setType('button')
buttonGame.setText('Game')
buttonGame.onClick(function (event) {
    event.preventDefault()



    location.href = '../home'
})

var registerLink = new Link
registerLink.setText('Logout')
registerLink.onClick(function (event) {
    event.preventDefault()

    location.href = '../login'
})

// var usersJson = localStorage.usersJson
// if (usersJson) {

//     var users = JSON.parse(usersJson)

//     var usernameWelcome = users.username

//     console.log(users)

// }

// alert(usernameWelcome)

view.add(title)
view.add(buttonGame)
view.add(registerLink)

