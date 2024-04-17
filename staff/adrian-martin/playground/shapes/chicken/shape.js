function Shape(){
    this.container = document.createElement('div')

    this.container.style.position = 'absolute'

    this.move(0, 0, 0)
}

Shape.prototype.setHeight = function(value) {
    this.container.style.height = value + 'px'
}

Shape.prototype.setWidth = function(value) {
    this.container.style.width = value + 'px'
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

Shape.prototype.setRotate = function(value){
    this.container.style.transform = 'rotate(' + value + 'deg)'
}

Shape.prototype.setRadius = function(value) {
    this.container.style.borderRadius = value + '%'
}

Shape.prototype.setColor = function(value) {
    this.container.style.backgroundColor = value
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
    // this.container.style.transitionProperty = 'transform'
    // this.container.style.transitionDuration = '0.5s'
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
    // this.container.style.transitionProperty = 'transform'
    // this.container.style.transitionDuration = '0.5s'
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