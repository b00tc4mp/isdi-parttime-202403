class Label extends Component {
  constructor() {
    super("label");
  }

  setHtmlFor(ID) {
    this.container.htmlFor = ID;
  }
}
