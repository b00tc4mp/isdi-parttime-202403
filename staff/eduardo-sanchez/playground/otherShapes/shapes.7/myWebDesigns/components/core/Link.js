function LinK() {
    Component.call(this, 'a')

    this.setUrl('')

}

LinK.prototype = Object.create(Component.prototype)
LinK.prototype.constructor = LinK

LinK.prototype.setUrl = function (url) {
    this.container.href = url
}

LinK.prototype.setTarget = function (target) {
    this.container.target = target
}

