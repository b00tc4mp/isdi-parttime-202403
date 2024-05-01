if(!logic.isUserLoggedIn())
    location.href = '../login'

var view = new Component(document.body)
view.addClass('View')

var userName = logic.getUsername()

var usernameTitle = new Heading(3)
usernameTitle.setText(userName)

var logoutButton = new Button
logoutButton.setText('Logout')

logoutButton.onClick(function() {
    logic.logoutUser()

    location.href = '../login'
})



var heart = new Heart()
heart.setX(300)
heart.setY(300)

var x = 300
var y = 300

document.onkeydown = function(event) {
    if (event.key === 'ArrowLeft')
        x -= 20

    else if(event.key === 'ArrowRight')
        x += 20

    else if(event.key === 'ArrowUp')
        y -= 20

    else if(event.key === 'ArrowDown')
        y += 20

    heart.setX(x)
    heart.setY(y)
}



view.add(heart)
view.add(logoutButton)
view.add(usernameTitle)

