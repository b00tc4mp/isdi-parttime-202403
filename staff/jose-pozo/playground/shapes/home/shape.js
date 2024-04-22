function Shape() {
    Component.call(this, 'div');

    this.container.style.position = 'absolute';
}

Shape.prototype = Object.create(Component.prototype)
Shape.prototype.constructor = Shape

Shape.prototype.setBackColor = function (value) {
    this.container.style.backgroundColor = value;
};

Shape.prototype.setBackImage = function (route) {
    this.container.style.backgroundImage = 'url(' + route + ')';
};

Shape.prototype.setBackPosition = function (position) {
    this.container.style.backgroundPosition = position;
};

Shape.prototype.setWidth = function (value) {
    this.container.style.width = value + 'px';
};

Shape.prototype.setHeight = function (value) {
    this.container.style.height = value + 'px';
};

Shape.prototype.setBorder = function (width, style, color) {
    this.container.style.borderWidth = width + 'px';
    this.container.style.borderStyle = style;
    this.container.style.borderColor = color;
};

Shape.prototype.setRadius = function (radius) {
    this.container.style.borderRadius = radius + '%'
}

Shape.prototype.setPosition = function (x, y) {
    this.container.style.left = x + 'px';
    this.container.style.top = y + 'px';
};

Shape.prototype.add = function (element) {
    this.container.appendChild(element);
};

Shape.prototype.setDisplay = function (type, x, y) {
    this.container.style.display = type;
    this.container.style.justifyContent = x;
    this.container.style.alignItems = y;
};