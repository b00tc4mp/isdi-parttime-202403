if (!logic.isUserLoggedIn())
    location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const userName = logic.getUserName()

const usernameTitle = new Heading(3)
usernameTitle.setText(userName)

view.add(usernameTitle)

const logoutButton = new Button
logoutButton.setText('Logout')

logoutButton.onClick(() => {
    logic.logoutUser()

    location.href = '../login'
})

view.add(logoutButton)

const face = new Face()
face.config('ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight')
face.move(100, 100, 0)

const face2 = new Face()
face2.config('w', 's', 'a', 'd')
face2.move(300, 300, 0)

const step = 40

let applyOnY = true

const shapes = [face, face2]

const doc = new Component(document)

doc.onKeyDown(event => {
    const key = event.key.toLowerCase()

    console.log(key)

    shapes.forEach(shape => {
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

doc.onKeyUp(event => {
    if (event.key === 'Alt')
        applyOnY = true
})

shapes.forEach(shape => view.add(shape))

//document.body.appendChild(face.container)
//document.body.appendChild(face2.container)