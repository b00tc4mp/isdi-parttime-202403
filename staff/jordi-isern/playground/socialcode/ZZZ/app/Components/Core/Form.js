    class Form extends Component{
    constructor(){
        super('form')

        this.addClass('Form')
    }

    onSubmit(listener){
        this.container.addEventListener('submit', listener)
    }
    clear(){
        this.container.reset()
    }
}