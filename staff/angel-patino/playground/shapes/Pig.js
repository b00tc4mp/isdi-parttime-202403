function Pig(){
    Shape.call(this)

    this.setColor('pink')
    this.setHeight(100)
    this.setWidth(100)
    this.setX(50)
    this.setY(170)

    var eyeL = new Shape ()
    eyeL.setHeight(50)
    eyeL.setWidth(50)
    eyeL.setRadius(50)
    eyeL.setColor('black')
    eyeL.setX(30)
    eyeL.setY(30)

    var eyeR = new Shape()
    eyeR.setHeight(50)
    eyeR.setWidth(50)
    eyeR.setRadius(50)
    eyeR.setColor('white')
    eyeR.setX(90)
    eyeR.setY(30)

    var face = new Shape()
    face.setColor('pink')
    face.setHeight(200)
    face.setWidth(200)
    face.setRadius(50)
    face.setY(-170)
    face.setX(-60)
    
    face.add(eyeL)
    face.add(eyeR)

    this.add(face)

    var footL = new Shape()
    footL.setColor('pink')
    footL.setHeight(100)
    footL.setWidth(50)
    footL.moveX(-20)
    footL.moveY(100)

    this.add(footL)

    var footR = new Shape()
    footR.setColor('pink')
    footR.setHeight(100)
    footR.setWidth(50)
    footR.moveX(80)
    footR.moveY(100)

    this.add(footR)
}
    
Pig.prototype = Object.create(Shape.prototype)
Pig.prototype.constructor = Pig