class Link extends Component {
  constructor() {
    super("a");

    this.addClass("Link");
    this.setUrl("");
  }

  setUrl(url) {
    this.container.href = url;
  }

  setTarget(target) {
    this.container.target = target;
  }
}
