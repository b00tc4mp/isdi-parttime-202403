// if (!logic.isUserLoggedIn())
//   location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const userName = logic.getUserName()

const usernameTitle = new Header(3)
usernameTitle.setText(userName)

view.add(usernameTitle)

const logoutButton = new Button
logoutButton.setText('Logout')



logoutButton.onClick(() => {
  logic.logoutUser()

  location.href = '../login'
})

view.add(logoutButton)


const pig = new Pig()
pig.config('ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight')
pig.move(100, 100, 0)

const pig2 = new Pig()
pig2.config('w', 's', 'a', 'd')
pig2.move(300, 300, 0)

const pig3 = new Pig()
pig3.config('i', 'k', 'j', 'l')
pig3.move(600, 600, 0)

const step = 50

let applyOnY = true

const shapes = [pig, pig2, pig3]

const doc = new Component(document)

doc.onKeyDown((event) => {
  const key = event.key.toLowerCase()

  console.log(key)

  shapes.forEach((shape) => {
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

  if (event.key === 'Shift')
    applyOnY = false
})

doc.onKeyUp(event => {
  console.log(event.key)

  if (event.key === 'Shift')
    applyOnY = true
})

shapes.forEach(shape => {
  view.add(shape)
})
