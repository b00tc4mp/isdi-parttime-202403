
var face = new Face()
face.config('ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight')
face.move(100, 100, 0)

var face2 = new Face()
face2.config('w', 's', 'a', 'd')
face2.move(300, 300, 0)

var step = 40

var applyOnY = true

var shapes = [face, face2]

document.onkeydown = function (event) {
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
}



document.onkeyup = function (event) {
    console.log(event.key)

    if (event.key === 'Alt')
        applyOnY = true
}

document.body.appendChild(face.container)
document.body.appendChild(face2.container)