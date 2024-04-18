function Component(tagName) {
    this.container = document.createElement(tagName)
}

Component.prototype.add = function (child) {
    this.container.appendChild(child.container)
}

function Shape() {
    Component.call(this, 'div')

    this.container.style.position = 'absolute'

    this.move(0, 0, 0)
}

Shape.prototype = Object.create(Component.prototype)



Shape.prototype.setHeight = function(value) {
    this.container.style.height = value + 'px';
}; 

Shape.prototype.setWidth = function(value) {
    this.container.style.width = value + 'px';
}; 

Shape.prototype.setRadius = function(value) {
    this.container.style.borderRadius = value + '%';
};

Shape.prototype.setColor = function(value) {
    this.container.style.backgroundColor = value;
};

Shape.prototype.setX = function(value) {
    this.container.style.transformationProperty = 'left';
    this.container.style.transitionDuration = '0.1s'
    this.container.style.left = value + 'px';
};

Shape.prototype.setY = function(value) {
    this.container.style.transformationProperty = 'top';
    this.container.style.transitionDuration = '0.1s'
    this.container.style.top = value + 'px';
};

Shape.prototype.setZ = function(value) {
    this.container.style.transformationProperty = 'transform';
    this.container.style.transitionDuration = '0.1s'
    this.container.style.transform = 'scale(' + (value + 100) / 100 + ')'
};

Shape.prototype.add = function(child) {
    this.container.appendChild(child.container);
};

Shape.prototype.setBoxShadow = function(value) {
    this.container.style.boxShadow = '20px -20px ' + value +'px rgba(0, 0, 0, 0.99)';
}
