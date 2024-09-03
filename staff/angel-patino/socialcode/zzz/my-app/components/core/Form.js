class Form extends Compponent {
    constructor() {
        super('form')

        this.add('Form')
    }

    onSubmit(listener) {
        this.container.addEventListener('click', listener)
    }

    clear() {
        this.container.reset()
    }
}