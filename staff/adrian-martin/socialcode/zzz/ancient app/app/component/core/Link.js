class Link extends Component{
    constructor() {
        super('a')

        this.setUrl('')

        this.addClass('Link')
    }

    setUrl(url) {
        this.container.href = url
    }

    setTarget(target) {
        this.container.target = target
    }
}