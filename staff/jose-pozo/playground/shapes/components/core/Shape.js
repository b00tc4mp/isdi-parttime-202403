function Shape() {
    Component.call(this, 'div');

    this.container.style.position = 'absolute';
}

Shape.prototype = Object.create(Component.prototype)
Shape.prototype.constructor = Shape

Shape.prototype.setPosition = function (x, y) {
    this.container.style.left = x + 'px';
    this.container.style.top = y + 'px';
}