class Shape extends Component {
    constructor() {
        super()// ya se asume que es un div
        this.container = document.createElement("div")
        this.container.style.position = "absolute"
    }

    setHeight(value) {
        this.container.style.height = value + "px"
    }

    setWidth(value) {
        this.container.style.width = value + "px"
    }

    setRadius(value) {
        this.container.style.borderRadius = value + "%"
    }

    setColor(value) {
        this.container.style.backgroundColor = value
    }

    setX(value) {
        this.container.style.left = value + "px"
    }

    setY(value) {
        this.container.style.top = value + "px"
    }


    setZIndex(value) {
        this.container.style.zIndex = value;
    }
}