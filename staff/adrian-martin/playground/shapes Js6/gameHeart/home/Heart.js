class Heart extends Shape{
    constructor(){
        super()

        this.setWidth(200)
        this.setHeight(200)
        this.setColor('rgb(240, 127, 127)')
        this.setRotate(45)
        // this.setPosition('absolute')
        
        const circle1 = new Shape
        
        circle1.setWidth(200)
        circle1.setHeight(200)
        circle1.setColor('rgb(240, 127, 127)')
        circle1.setRadius(50)
        circle1.setX(0)
        circle1.setY(-100)

        const circle2 = new Shape

        circle2.setWidth(200)
        circle2.setHeight(200)
        circle2.setColor('rgb(240, 127, 127)')
        circle2.setRadius(50)
        circle2.setX(-100)
        circle2.setY(0)

        this.add(circle1)
        this.add(circle2)
    }
}
