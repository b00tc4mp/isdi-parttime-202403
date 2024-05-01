if(!logic.isUserLoggedIn())
    location.href = '../login'

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

const heart = new Heart()
heart.setX(300)
heart.setY(300)

let x = 300
let y = 300

document.onkeydown(event => {
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
})

view.add(heart)
view.add(logoutButton)
view.add(usernameTitle)

