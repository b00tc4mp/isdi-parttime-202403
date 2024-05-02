class Label extends Component {
    constructor() {
        super('label')
    }

    setFor(id) {
        this.container.htmlFor = id
    }
}
