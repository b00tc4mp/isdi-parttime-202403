if (!logic.isUserLoggedIn())
    location.href = '../login'

var view = new Component(document.body)
view.addClass('View')

var userName = logic.getUserName()

var usernameTitle = new Heading(3)
usernameTitle.setText(userName)

view.add(usernameTitle)

var logoutButton = new Button
logoutButton.setText('Logout')

logoutButton.onClick(function () {
    logic.logoutUser()

    location.href = '../login'
})

view.add(logoutButton)

var face = new Face()
face.config('ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight')
face.move(100, 100, 0)

var face2 = new Face()
face2.config('w', 's', 'a', 'd')
face2.move(300, 300, 0)

var step = 40

var applyOnY = true

var shapes = [face, face2]

var doc = new Component(document)

doc.onKeyDown(function (event) {
    var key = event.key.toLowerCase()

    console.log(key)

    shapes.forEach(function (shape) {
        if (key === shape.keyLeft.toLowerCase())
            shape.moveRelativeX(-step)
        else if (key === shape.keyRight.toLowerCase())
            shape.moveRelativeX(step)
        else if (key === shape.keyUp.toLowerCase()) {
            if (applyOnY)
                shape.moveRelativeY(-step)
            else
                shape.moveRelativeZ(-step)
        } else if (key === shape.keyDown.toLowerCase()) {
            if (applyOnY)
                shape.moveRelativeY(step)
            else
                shape.moveRelativeZ(step)
        }
    })

    if (event.key === 'Alt')
        applyOnY = false
})



doc.onKeyUp(function (event) {
    console.log(event.key)

    if (event.key === 'Alt')
        applyOnY = true
})

shapes.forEach(function (shape) {
    view.add(shape)
})

//document.body.appendChild(face.container)
//document.body.appendChild(face2.container)