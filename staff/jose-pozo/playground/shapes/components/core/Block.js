function Block() {
    Component.call(this, 'div')
}

Block.prototype = Object.create(Component.prototype)
Block.prototype.constructor = Block