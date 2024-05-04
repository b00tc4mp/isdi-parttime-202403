class TextArea extends Component {
  constructor() {
    super("textArea");

    this.addClass("TextArea")
  }

  setPlaceholder(placeholder) {
    this.container.placeholder = placeholder
  }

}