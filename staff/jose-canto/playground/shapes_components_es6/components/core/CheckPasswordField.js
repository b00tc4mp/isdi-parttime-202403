class CheckPasswordField extends Component {
  constructor(id, type, text) {
    super()

    this.addClass("Field")


    const icon = new Component("i")
    icon.addClass("fa-regular")
    icon.addClass("fa-eye")


    const label = new Label()
    label.setText(text)
    label.setFor(id)

    const input = new Input()
    input.setId(id)
    input.setType(type)


    let showPassword = true

    icon.onClick(() => {
      showPassword = !showPassword

      if (!showPassword) {
        icon.removeClass("fa-eye")
        icon.addClass("fa-eye-slash")
        input.setType("text")
      } else {
        icon.removeClass("fa-eye-slash")
        icon.addClass("fa-eye")
        input.setType("password")
      }
    })


    this.add(label)
    this.add(input)
    this.add(icon)
  }

  setPlaceholder(placeholder) {
    this.children[1].setPlaceholder(placeholder)
  }

  getValue() {
    const input = this.children[1]
    return input.getValue()
  }
}