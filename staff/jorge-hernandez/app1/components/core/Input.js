class Input extends Component {
  constructor() {
    super('input')
  }

  setId(id) {
    this.container.id = id
  }
  setType(type) {
    this.container.type = type
  }
  getValue() {
    return this.container.value
  }
  setPlaceholder(placeholder) {
    this.container.placeholder = placeholder
  }
}
