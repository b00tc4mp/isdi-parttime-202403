class Link extends Component {
    constructor() {
        super('a')

        this.setUrl('')
    }

    setUrl(url) {
        this.container.href = url
    }

    setTarget(target) {
        this.conainer.taget = target
    }
}