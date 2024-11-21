
function Shape() {
    this.container = document.createElement("div")
    this.container.style.position = "absolute"
}

Shape.prototype.setHeight = function (value) {
    this.container.style.height = value + "px"
}

Shape.prototype.setWidth = function (value) {
    this.container.style.width = value + "px"
}

Shape.prototype.setRadius = function (value) {
    this.container.style.borderRadius = value + "%"
}

Shape.prototype.setColor = function (value) {
    this.container.style.backgroundColor = value
}

Shape.prototype.setX = function (value) {
    this.container.style.left = value + "px"
}

Shape.prototype.setY = function (value) {
    this.container.style.top = value + "px"
}

Shape.prototype.add = function (child) {
    this.container.appendChild(child.container)
}
Shape.prototype.setZIndex = function (value) {
    this.container.style.zIndex = value;
}