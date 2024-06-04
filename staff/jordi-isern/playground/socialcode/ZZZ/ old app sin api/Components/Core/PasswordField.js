class PasswordField extends Component{
    constructor(id,text){
        super('div')

        this.addClass('FieldPassword')

        const divLavel = new Component('div')
        divLavel.addClass('divLavel')


        const label = new Label
        label.setText(text)
        label.setFor(id)


        const divInput = new Component('div')
        divInput.addClass('divInputPassword')
        
        const input = new Input
        input.setId(id)
        input.addClass('input')
        let type = 'password'
        input.setType(type)
        

        const divLock = new Component('div')
        divLock.addClass('divLock')
        const lock = new Component('i')
        lock.addClass('lock')
        lock.addClass("fa-solid")
        lock.addClass("fa-lock")

        const changeType = function(){
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

    setPlaceholder(placeholder){
        this.children[1].children[0].setPlaceholder(placeholder)
    }

    getValue(){
        const input = this.children[1].children[0]
        return input.getValue()
    }
}