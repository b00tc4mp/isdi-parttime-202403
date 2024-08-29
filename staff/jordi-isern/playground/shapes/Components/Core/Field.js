function Field(id, type,text){
    Component.call(this, 'div')

    this.addClass('Field')

    var label = new Label
    label.setText(text)
    label.setFor(id)
    
    var divInput = new Component('div')
    divInput.addClass('divInput')
    
    var input = new Input
    input.setId(id)
    input.addClass('input')
    input.setType(type)

    this.add(label)
    this.add(divInput)
    divInput.add(input)
}

Field.prototype = Object.create(Component.prototype)
Field.prototype.constructor = Field

Field.prototype.setPlaceholder = function(placeholder){
    this.children[1].children[0].setPlaceholder(placeholder)
}

Field.prototype.getValue = function(){
    var input = this.children[1].children[0]
    return input.getValue()
}