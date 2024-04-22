function Paragraph() {
    Component.call(this, 'P')
}

Paragraph.prototype = Object.create(Component.prototype)
Paragraph.prototype.constructor = Paragraph

Paragraph.prototype.setSpan = function (text) {
    this.container.SPAN = text
}