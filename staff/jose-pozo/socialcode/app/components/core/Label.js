class Label extends Component {
    constructor() {
        super('label')

        this.addClass('Label')
    }

    setFor(id) {
        this.container.htmlFor = id
    }
}