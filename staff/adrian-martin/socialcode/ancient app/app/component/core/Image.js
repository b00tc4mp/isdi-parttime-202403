class Image extends Component {
    constructor(){
        super('img')

        this.addClass('Image')
    }

    setUrl(url) {
        this.container.src = url
    }

    setAltText(altText) {
        this.container.alt = altText
    }
}