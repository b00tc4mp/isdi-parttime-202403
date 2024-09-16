class Button extends Component {
    constructor() {
        super('button');
        this.addClass('Button');
    }

    setType(type) {
        this.container.type = type;
    }
}