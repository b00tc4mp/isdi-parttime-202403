function Label (){
    Component.call(this,'label')
}

Label.prototype = Object.create(Component.prototype)
Label.prototype.contructor = Label

Label.prototype.setFor = function(id) {
    this.container.hrtmlFor = id
}
