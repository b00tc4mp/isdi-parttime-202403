class Image extends Component{
    constructor(){
        super('Img')

        this.addClass('Image')
    }
    setUrl(url){
        this.container.src = url
    }

    setAltText(altText){
        this.container.alt = altText
    }
}