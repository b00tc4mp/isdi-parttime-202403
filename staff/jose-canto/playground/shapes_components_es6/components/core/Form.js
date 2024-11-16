class Form extends Component {
  constructor() {
    super('form')

    this.addClass('Form')
  }

  onSubmit(listener) {
    this.container.addEventListener("submit", listener)
  }

  // clear para resetear el formulario
  clear() {
    this.container.reset()
  }
}