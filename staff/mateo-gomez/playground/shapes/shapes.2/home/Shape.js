function Shape() {
    Component.call(this, 'div')

    this.container.style.position = 'absolute'

    this.move(0, 0, 0)
}

Shape.prototype = Object.create(Component.prototype)



Shape.prototype.setHeight = function (value) {
    this.container.style.height = value + 'px'
}

Shape.prototype.setWidth = function (value) {
    this.container.style.width = value + 'px'
}

Shape.prototype.setRadius = function (value) {
    this.container.style.borderRadius = value + '%'

}

Shape.prototype.setColor = function (value) {
    this.container.style.backgroundColor = value
}

Shape.prototype.setBorderColor = function (value) {
    this.container.style.border = '2px solid ' + value
}

Shape.prototype.setBoxShadow = function (offsetX, offsetY, blurRadius, color) {
    var boxShadowValue = offsetX + 'px ' + offsetY + 'px ' + blurRadius + 'px ' + color
    this.container.style.boxShadow = boxShadowValue
}

Shape.prototype.add = function (child) {
    this.container.appendChild(child.container)
}

Shape.prototype.setPosition = function (value) {
    this.container.style.position = value
}

Shape.prototype.setX = function (value) {
    this.container.style.transformationProperty = 'left';
    this.container.style.transitionDuration = '0.1s'
    this.container.style.left = value + 'px';
};

Shape.prototype.setY = function (value) {
    this.container.style.transformationProperty = 'top';
    this.container.style.transitionDuration = '0.1s'
    this.container.style.top = value + 'px';
};

Shape.prototype.setZ = function (value) {
    this.container.style.transformationProperty = 'transform';
    this.container.style.transitionDuration = '0.1s'
    this.container.style.transform = 'scale(' + (value + 100) / 100 + ')'
};