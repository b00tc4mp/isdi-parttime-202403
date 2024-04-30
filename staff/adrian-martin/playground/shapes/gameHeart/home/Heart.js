function Heart(){
    Shape.call(this)

    this.setWidth(200)
    this.setHeight(200)
    this.setColor('rgb(240, 127, 127)')
    this.setRotate(45)
    // this.setPosition('absolute')
    
    var circle1 = new Shape

    circle1.setWidth(200)
    circle1.setHeight(200)
    circle1.setColor('rgb(240, 127, 127)')
    circle1.setRadius(50)
    circle1.setX(0)
    circle1.setY(-100)

    var circle2 = new Shape

    circle2.setWidth(200)
    circle2.setHeight(200)
    circle2.setColor('rgb(240, 127, 127)')
    circle2.setRadius(50)
    circle2.setX(-100)
    circle2.setY(0)

    this.add(circle1)
    this.add(circle2)
}

Heart.prototype = Object.create(Shape.prototype)
Heart.prototype.constructor = Heart