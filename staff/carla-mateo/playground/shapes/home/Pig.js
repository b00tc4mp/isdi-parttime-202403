class Pig extends Shape {
    constructor() {
        super()
        this.setColor('green')
        this.setHeight(130)
        this.setWidth(100)
        this.moveX(100)
        this.moveY(200)

        var eyeL = new Shape()
        eyeL.setHeight(50)
        eyeL.setWidth(50)
        eyeL.setRadius(50)
        eyeL.setColor('black')
        eyeL.moveX(50)
        eyeL.moveY(30)

        var eyeR = new Shape()
        eyeR.setHeight(50)
        eyeR.setWidth(50)
        eyeR.setRadius(50)
        eyeR.setColor('black')
        eyeR.moveX(110)
        eyeR.moveY(30)

        var mouth = new Shape()
        mouth.setColor('red')
        mouth.setHeight(50)
        mouth.setHeight(50)
        mouth.setRadius(50)
        mouth.moveX(60)
        mouth.moveY(30)


        var face = new Shape()
        face.setColor('pink')
        face.setHeight(200)
        face.setWidth(200)
        face.setRadius(50)
        face.moveX(-50)
        face.moveY(-200)

        face.add(eyeL)
        face.add(eyeR)
        face.add(mouth)

        this.add(face)

        var footL = new Shape()
        footL.setColor('brown')
        footL.setHeight(100)
        footL.setWidth(50)
        footL.moveX(-20)
        footL.moveY(130)

        this.add(footL)

        var footR = new Shape()
        footR.setColor('brown')
        footR.setHeight(100)
        footR.setWidth(50)
        footR.moveX(70)
        footR.moveY(130)

        this.add(footR)
    }
}

