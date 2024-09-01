function Paragraph() {
    Component.call(this, 'P')
}

Paragraph.prototype = Object.create(Component.prototype)
Paragraph.prototype.constructor = Paragraph

