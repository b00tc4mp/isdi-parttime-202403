function Shape(){
    Component.call(this, 'div')

    this.container.style.position = 'absolute'

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

Shape.prototype.setRotate = function (value) {
    this.container.style.transform = 'rotate(' + value + 'deg)'
}

Shape.prototype.setBorder = function (width, style, color){
    if(width !== undefined)
        this.container.style.borderWidth = width + 'px'

    if(style !== undefined)
        this.container.style.borderStyle = style

    if(color !== undefined)
        this.container.style.borderColor = color
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
 
Shape.prototype.add = function (child) {
    this.container.appendChild(child.container)
}

// Shape.prototype.setPosition = function (value) {
//     this.container.style.position = value
// }