function Field(id, type, text) {
    Component.call(this, 'div')

    this.addClass('Field')

    var label = new Label
    label.setText(text)
    label.setFor(id)

    var input = new Input
    input.setId(id)
    input.setType(type)

    this.add(label)
    this.add(input)
}

Field.prototype = Object.create(Component.prototype)
Field.prototype.constructor = Field

Field.prototype.setPlaceholder = function (placeholder) {
    this.children[1].setPlaceholder(placeholder)
}