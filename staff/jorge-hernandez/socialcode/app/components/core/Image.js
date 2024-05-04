class Image extends Component {
  constructor() {
    super('img')
    this.addClass('Image')
  }

  setAltText(text) {
    this.container.alt = text
  }

  setUrl(url) {
    this.container.src = url
  }
}
