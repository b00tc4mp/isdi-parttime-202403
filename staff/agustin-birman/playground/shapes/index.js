function Shape () {
    this.container = document.createElement('div')

    this.container.style.position = 'absolute'
}

Shape.prototype.add = function (child){
    this.container.appendChild(child.container)
}

Shape.prototype.setHeight = function (value) {
    this.container.style.height = value + 'px'
}

Shape.prototype.setWidth = function (value) {
    this.container.style.width = value + 'px'
}

Shape.prototype.setColor = function (value) {
    this.container.style.backgroundColor = value 
}

Shape.prototype.setRadius = function (value) {
    this.container.style.borderRadius = value + '%'
}

Shape.prototype.setX = function (value) {
    this.container.style.left = value + 'px'
}

Shape.prototype.setY = function (value) {
    this.container.style.top = value + 'px'
}

Shape.prototype.triangle (height, width) {
    this.container.style.borderLeftWidth = height + 'px'
    this.container.style.borderLeftStyle = 'solid'
    this.container.style.borderLeftColor = 'transparent'
    this.container.style.borderRigthWidth = height + 'px'
    this.container.style.borderRigthStyle = 'solid'
    this.container.style.borderRigthColor = 'transparent'
    this.container.style.borderTopWidth = width + 'px'
    this.container.style.borderTopStyle = 'solid'
    this.container.style.borderTopColor = 'black'
    
}

var circle = new Shape()
circle.setWidth(50)
circle.setHeight(50)
circle.setRadius(50)


document.body.appendChild(circle)

