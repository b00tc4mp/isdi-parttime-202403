function Shape(){
    Component.call(this, 'div')

    this.container.style.position = 'absolute'

    this.x = 0
    this.y = 0

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

Shape.prototype.setX = function(value) {
    this.container.style.left = value + 'px'
}

Shape.prototype.setY = function(value) {
    this.container.style.top = value + 'px'
}

// Shape.prototype.setLocation = function(x, y){
//     this.x = x
//     this.y = y

// }

Shape.prototype.add = function(child) {
    this.container.appendChild(child.container)
}