function PasswordField(id,text){
    Component.call(this, 'div')

    this.addClass('PasswordField')

    var divLavel = new Component('div')
    divLavel.addClass('divLavel')


    var label = new Label
    label.setText(text)
    label.setFor(id)


    var divInput = new Component('div')
    divInput.addClass('divInputPassword')
    
    var input = new Input
    input.setId(id)
    var type = 'password'
    input.setType(type)
    

    var divLock = new Component('div')
    divLock.addClass('divLock')
    var lock = new Component('i')
    lock.addClass("fa-solid")
    lock.addClass("fa-lock")

    var changeType = function(){
        if (type === 'password'){
            type = 'text'
            input.setType(type)
            lock.removeClass("fa-lock")
            lock.addClass("fa-lock-open")

        }else if(type === 'text'){
            type = 'password'
            input.setType(type)
            lock.addClass("fa-lock")
            lock.removeClass("fa-lock-open")
        }
    }
  lock.onClick(changeType)


    this.add(divLavel)
    divLavel.add(label)
    this.add(divInput)
    divInput.add(input)
    divInput.add(lock)
}

PasswordField.prototype = Object.create(Component.prototype)
PasswordField.prototype.constructor = PasswordField

PasswordField.prototype.setPlaceholder = function(placeholder){
    this.children[1].setPlaceholder(placeholder)
}

PasswordField.prototype.getValue = function(){
    var input = this.children[1].children[0]
    return input.getValue()
}