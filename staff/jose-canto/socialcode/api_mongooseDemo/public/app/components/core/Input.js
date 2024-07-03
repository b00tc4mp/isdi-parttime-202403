// Definimos la clase Input que hereda de la clase Component
class Input extends Component {
  constructor() {
    // Llamamos al constructor de Component con el argumento "input"
    super("input")

    this.container.required = true
  }

  setType(type) {
    this.container.type = type
  }

  setPlaceholder(placeholder) {
    this.container.placeholder = placeholder
  }

  getValue() {
    return this.container.value
  }
}