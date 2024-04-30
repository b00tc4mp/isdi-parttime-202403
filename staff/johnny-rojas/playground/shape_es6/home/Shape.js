class Shape extends Component {
  constructor() {
      super()

      this.container.style.position = 'absolute'

      this.move(0, 0, 0)
  }

  setHeight(height) {
      this.height = height
      this.container.style.height = height + 'px'
  }

  setWidth(width) {
      this.width = width
      this.container.style.width = width + 'px'
  }

  setRadius(radius) {
      this.container.style.borderRadius = radius + '%'
  }

  setColor(color) {
      this.container.style.backgroundColor = color
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

  config(keyUp, keyDown, keyLeft, keyRight) {
      this.keyUp = keyUp
      this.keyDown = keyDown
      this.keyLeft = keyLeft
      this.keyRight = keyRight
  }
}