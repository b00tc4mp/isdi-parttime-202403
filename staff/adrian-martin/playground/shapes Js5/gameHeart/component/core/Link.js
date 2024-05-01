function Link() {
    Component.call(this, 'a')

    this.setUrl('')

    this.addClass('Link')
}

Link.prototype = Object.create(Component.prototype)
Link.prototype.constructor = Link

Link.prototype.setUrl = function (url) {
    this.container.href = url
}