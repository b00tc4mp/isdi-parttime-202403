class Form extends Component {
  constructor() {
    super("form");
    this.addClass("Form");
  }

  onSubmit(callback) {
    this.container.addEventListener("submit", callback);
  }

  clear() {
    this.container.reset();
  }
}
