function Label() {
    Component.call(this, 'label')
}

Label.prototype = Object.create(Component.prototype)
Label.prototype.constructor = Form

Label.prototype.setFor = function (id) {
    this.container.htmlFor = id
}