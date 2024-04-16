function Shape() {
    this.container = document.createElement('div')
    this.container.style.position = 'absolute'

    this.move(0, 0, 0)

}

Shape.prototype.setHeight = function(height) {
    this.height = height
    this.container.style.height = height + 'px'
}

Shape.prototype.setWidth = function(width){  
    this.width = width
    this.container.style.width = width + 'px'

}

Shape.prototype.setRadius = function(radius){
    
    this.container.style.borderRadius = radius + '%'
}

Shape.prototype.setColor = function(color){  
    this.container.style.backgroundColor = color

}

Shape.prototype.moveX = function(x) {
    this.x = x
    this.container.style.left = x +'px'
}

Shape.prototype.movetY = function (y) {
    this.y = y
    this.container.style.top = y +'px'
}

Shape.prototype.moveZ = function (z) {
    this.z = z
    this.container.style.transform = 'scale( ' + (z + 100) / 100 + ')'
        
 }

 Shape.prototype.move = function(x, y, z) {
    this.moveX(x)
    this.movetY(y)
    this.moveZ(z)
 }

 Shape.prototype.moveReltaiveX = function (dx) {
    this.x += dx
    this.container.style.left = this.x +'px'
 }

 Shape.prototype.moveReltaiveY = function (dy) {
    this.y += dy
    this.container.style.top = this.y +'px'
 }

 Shape.prototype.moveReltaiveZ = function (dz) {
    this.z += dz
    this.container.style.transform = 'scale(' + (this.z + 100) / 100 +')'
 }

 Shape.prototype.moveRelative = function (dx, dy, dz) {
    this.moveReltaiveX(dx)
    this.moveReltaiveY(dy)
    this.moveReltaiveZ(dz)
 }

Shape.prototype.add = function(child) {
    this.container.appendChild(child.container)
}

Shape.prototype.config = function (keyUp, KeyDown, keyLeft, keyRight) {
    this.keyUp = keyUp
    this.KeyDown = KeyDown
    this.keyLeft = keyLeft
    this.keyRight = keyRight
}

