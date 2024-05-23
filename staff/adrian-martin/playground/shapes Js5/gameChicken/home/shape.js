function Shape(){
    Component.call(this, 'div')

    this.container.style.position = 'absolute'

    this.move(0, 0, 0)
}

Shape.prototype.setHeight = function(height) {
    this.height = height
    this.container.style.height = height + 'px'
}

Shape.prototype.setWidth = function(width) {
    this.width = width
    this.container.style.width = width + 'px'
}

Shape.prototype.setBorder = function(width, style, color) {
    if(width !== undefined){
        this.container.style.borderWidth = width + 'px'
    }
    if(style !== undefined){
        this.container.style.borderStyle = style
    }
    if(color !== undefined){
        this.container.style.borderColor = color
    }

}

Shape.prototype.setRotate = function(rotate){
    this.rotate = rotate
    this.container.style.transform = 'rotate(' + rotate + 'deg)'
}

Shape.prototype.setRadius = function(radius) {
    this.radius = radius
    this.container.style.borderRadius = radius + '%'
}

Shape.prototype.setColor = function(color) {
    this.container.style.backgroundColor = color
}

Shape.prototype.setX = function(x) {
    this.x = x
    this.container.style.left = x + 'px'
}

Shape.prototype.setY = function(y) {
    this.y = y
    this.container.style.top = y + 'px'
}

Shape.prototype.setZ = function(z) {
    this.z = z
    this.container.style.transform = 'scale(' + (z + 100) / 100 + ')'
}

Shape.prototype.setXRelative = function(dx) {
    this.x -= dx
    this.container.style.left = this.x + 'px'
}

Shape.prototype.setYRelative = function(dy) {
    this.y -= dy
    this.container.style.top = this.y + 'px'
}

Shape.prototype.setZRelative = function(dz) {
    this.z -= dz
    this.container.style.transform = 'scale(' + (this.z + 100) / 100 + ')'
}

Shape.prototype.move = function(x, y, z) {
    this.setX(x)
    this.setY(y)
    this.setZ(z)
}

Shape.prototype.moveRelative = function(dx, dy, dz) {
    this.setXRelative(dx)
    this.setYRelative(dy)
    this.setZRelative(dz)
}

Shape.prototype.add = function(child) {
    this.container.appendChild(child.container)
}

Shape.prototype.config = function(keyUp, keyDown, keyLeft, keyRight) {
    this.keyUp = keyUp
    this.keyDown = keyDown
    this.keyLeft = keyLeft
    this.keyRight = keyRight
}