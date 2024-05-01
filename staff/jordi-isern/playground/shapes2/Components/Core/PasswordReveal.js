function PasswordReveal (input, icon){
    Component.call(this, 'i')

    //this.addClass(icon)

    // this.onclick(function(){
    //     input.setType('text')
    // })
}

PasswordReveal.prototype = Object.create(Component.prototype)
PasswordReveal.prototype.constructor = PasswordReveal