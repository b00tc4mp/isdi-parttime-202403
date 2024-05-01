class Shape extends Component {
    constructor(){
        super()

            this.container.style.position = 'absolute'
        }

        setHeight(value) {
            this.container.style.height = value + 'px'
        }

        setWidth(value) {
            this.container.style.width = value + 'px'
        }

        setColor(value) {
            this.container.style.backgroundColor = value
        }

        setRotate(value) {
            this.container.style.transform = 'rotate(' + value + 'deg)'
        }

        setBorder(width, style, color){
            if(width !== undefined)
                this.container.style.borderWidth = width + 'px'

            if(style !== undefined)
                this.container.style.borderStyle = style

            if(color !== undefined)
                this.container.style.borderColor = color
        }

        setRadius(value) {
            this.container.style.borderRadius = value + '%'
        }

        setX(value) {
            this.container.style.left = value + 'px'
        }

        setY(value) {
            this.container.style.top = value + 'px'
        }
        
        add(child) {
            this.container.appendChild(child.container)
    }
}

// Shape.prototype.setPosition = function (value) {
//     this.container.style.position = value
// }