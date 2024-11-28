function Paragraph() {
    Component.call(this, 'p')
}

Paragraph.prototype = Object.create(Component.prototype)
Paragraph.prototype.constructor = Paragraph
