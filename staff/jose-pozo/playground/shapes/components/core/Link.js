function Link() {
    Component.call(this, "a")
}

Link.prototype = Object.create(Component.prototype)
Link.prototype.constructor = Link

Link.prototype.setHref = function (href) {
    this.container.href = href
}

Link.prototype.setTarget = function (target) {
    this.container.target = target
}