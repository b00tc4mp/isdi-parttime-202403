class Form extends Component {
    constructor() {
        super('form')

        this.container.classList.add('Form')
    }
    onSubmit(listener) {
        this.container.addEventListener('submit', listener)
    }

    clear() {
        this.container.reset()
    }
}