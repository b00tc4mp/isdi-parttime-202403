class Shape extends Component {
    constructor() {
        super('div')

        this.container.style.position = 'absolute'

        this.move(0, 0, 0)
    }

    setHeight(value) {
        this.container.style.height = value + 'px'
    }

    setWidth(value) {
        this.container.style.width = value + 'px'
    }

    setRadius(value) {
        this.container.style.borderRadius = value + '%'

    }

    setColor(value) {
        this.container.style.backgroundColor = value
    }

    setBorderColor(value) {
        this.container.style.border = '2px solid ' + value
    }

    setBoxShadow(offsetX, offsetY, blurRadius, color) {
        var boxShadowValue = offsetX + 'px ' + offsetY + 'px ' + blurRadius + 'px ' + color
        this.container.style.boxShadow = boxShadowValue
    }

    add(child) {
        this.container.appendChild(child.container)
    }

    setPosition(value) {
        this.container.style.position = value
    }

    setX(value) {
        this.container.style.transformationProperty = 'left';
        this.container.style.transitionDuration = '0.1s'
        this.container.style.left = value + 'px';
    };

    setY(value) {
        this.container.style.transformationProperty = 'top';
        this.container.style.transitionDuration = '0.1s'
        this.container.style.top = value + 'px';
    };

    setZ(value) {
        this.container.style.transformationProperty = 'transform';
        this.container.style.transitionDuration = '0.1s'
        this.container.style.transform = 'scale(' + (value + 100) / 100 + ')'
    }
}