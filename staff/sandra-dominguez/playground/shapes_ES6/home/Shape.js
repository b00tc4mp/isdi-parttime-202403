class Shape extends Component {
    constructor() {
        super()

        this.container.style.position = 'absolute'

        this.move(0, 0, 0)

    }

    setHeight(value) {
        this.container.style.height = value + 'px'
    }

    setWidth(value) {
        this.container.style.width = value + 'px'
    }

    setRadius(value) {
        this.container.style.borderRadius = value + '%'
    }

    setColor(value) {
        this.container.style.backgroundColor = value
    }

    moveX(x) {
        this.x = x
        this.container.style.left = x + 'px'
    }

    moveY(y) {
        this.y = y
        this.container.style.top = y + 'px'
    }

    moveZ(z) {
        this.z = z
        this.container.style.transform = 'scale(' + (z + 100) / 100 + ')'
    }

    setBorder(pixels, bor, col) {
        console.log(pixels, bor, col)
        this.container.style.borderWidth = '3px'
        this.container.style.borderStyle = 'solid'
        this.container.style.borderColor = 'black'
    }


    setzIndex(value) {
        this.container.style.zIndex = value
    }

    move(x, y, z) {
        this.moveX(x)
        this.moveY(y)
        this.moveZ(z)
    }

    moveRelativeX(dx) {
        this.x += dx
        this.container.style.left = this.x + 'px'
    }

    moveRelativeY(dy) {
        this.y += dy
        this.container.style.top = this.y + 'px'
    }

    moveRelativeZ(dz) {
        this.z += dz
        this.container.style.transform = 'scale(' + (this.z + 100) / 100 + ')'
    }

    moveRelative(dx, dy, dz) {
        this.moveRelativeX(dx)
        this.moveRelativeY(dy)
        this.moveRelativeZ(dz)
    }

    add(child) {
        this.container.appendChild(child.container)
    }

    config(keyUp, keyDown, keyLeft, keyRight) {
        this.keyUp = keyUp
        this.keyDown = keyDown
        this.keyLeft = keyLeft
        this.keyRight = keyRight
    }
}