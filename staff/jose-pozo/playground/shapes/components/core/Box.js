function Box() {
    Component.call(this, 'div')
}

Box.prototype = Object.create(Component.prototype)
Box.prototype.constructor = Box