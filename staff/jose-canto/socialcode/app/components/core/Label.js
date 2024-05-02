// Definimos la clase Label que hereda de la clase Component
class Label extends Component {
  constructor() {
    // Llamamos al constructor de Component con el argumento "lable"
    super("label")
  }

  setFor(id) {
    this.container.htmlFor = id
  }
}