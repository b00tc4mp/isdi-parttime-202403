function Input () {
    Component.call(this , 'input')
    this.addClass('Input')
}
Input.prototype = Object.create(Component.prototype)
Input.prototype.contructor = Input


Input.prototype.setType = function (type) {
    this.container.type = type
}

Input.prototype.setPlaceholder = function(placeholcer) {
    this.container.placeholcer = placeholcer
}

Input.prototype.getValue = function(){
    return this.container.value
}
