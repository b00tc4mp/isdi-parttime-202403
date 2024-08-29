function Link() {
    Component.call(this, 'a')

    this.href = ('')
}

Link.prototype = Object.create(Component.prototype)
Link.prototype.constructor = Link

Link.prototype.setUrl = function (url) {
    this.container.href = url
}

Link.prototype.setTarget = function (target) {
    this.container.target = target
}