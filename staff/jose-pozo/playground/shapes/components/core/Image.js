function Image() {
    Component.call(this, 'img')
}

Image.prototype = Object.create(Component.prototype)
Image.prototype.constructor = Image

Image.prototype.setSrc = function (src) {
    this.container.src = src
}



