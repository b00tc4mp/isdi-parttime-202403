function Img(src) {
    Component.call(this, 'img');
    this.container.src = src;
}

Img.prototype = Object.create(Component.prototype);
Img.prototype.constructor = Img;