class Image extends Component {
  constructor() {
    super("img")

    this.addClass("Image")
  }

  setImage(url) {
    this.container.src = url
  }

  setAlt(altText) {
    this.container.alt = altText
  }
}