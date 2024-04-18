function Field(id, type, text) {
    Component.call(this, 'div')

    this.addClass('Field')

    var label = new Label
    label.setText(text)
    label.setFor(id)

    var input = new Input
    input.setId('nombre')
    input.setType(type)

    this.add(label)
    this.add(input)

}

Field.prototype = Object.create(Component.prototype)
Field.prototype.contructor = Field