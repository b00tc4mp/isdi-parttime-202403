function LinK() {
    Component.call(this, 'a')

}

LinK.prototype = Object.create(Component.prototype)
LinK.prototype.constructor = Link

