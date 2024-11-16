if (!logic.isUserLoggedIn()) {
  location.href = "../login"
}

var view = new Component(document.body)
view.addClass("View")

var userName = logic.getUserName()
var usernameTitle = new Header(3)
usernameTitle.setText(userName)

view.add(usernameTitle)

var logoutButton = new Button()
logoutButton.setText("LOGOUT")

logoutButton.onClick(function () {
  logic.logoutUser()

  location.href = "../login"
})


view.add(logoutButton)

var pig = new Pig()
pig.config('ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight')
pig.move(100, 100, 0)

var pig2 = new Pig()
pig2.config('w', 's', 'a', 'd')
pig2.move(300, 300, 0)

var pig3 = new Pig()
pig3.config('i', 'k', 'j', 'l')
pig3.move(600, 600, 0)

var step = 50

var applyOnY = true

var shapes = [pig, pig2, pig3]

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

  if (event.key === 'Shift')
    applyOnY = false
})

doc.onKeyUp(function (event) {
  console.log(event.key)

  if (event.key === 'Shift')
    applyOnY = true

})

shapes.forEach(function (shape) {
  view.add(shape)
})
