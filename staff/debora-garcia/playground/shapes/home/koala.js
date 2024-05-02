class Koala extends Shape {
    constructor() {
        super()

        this.setX(40)
        this.setY(50)

        const face = new Shape()
        face.setHeight(120)
        face.setWidth(130)
        face.setRadius(50)
        face.setColor("darkgray")

        this.add(face)

        const eyeL = new Shape()
        eyeL.setHeight(15)
        eyeL.setWidth(15)
        eyeL.setRadius(50)
        eyeL.setColor("black")
        eyeL.setX(85)
        eyeL.setY(40)

        face.add(eyeL)

        const eyeR = new Shape()
        eyeR.setHeight(15)
        eyeR.setWidth(15)
        eyeR.setRadius(50)
        eyeR.setX(30)
        eyeR.setY(40)
        eyeR.setColor("black")

        face.add(eyeR)


        const nose = new Shape()
        nose.setHeight(40)
        nose.setWidth(25)
        nose.setRadius(50)
        nose.setX(53)
        nose.setY(55)
        nose.setColor("dimgray")

        face.add(nose)


        const earL = new Shape()
        earL.setHeight(50)
        earL.setWidth(50)
        earL.setRadius(50)
        earL.setX(-10)
        earL.setY(-20)
        earL.setZIndex(-2)
        earL.setColor("darkgrey")

        face.add(earL)

        const insideEarL = new Shape()
        insideEarL.setHeight(35)
        insideEarL.setWidth(35)
        insideEarL.setRadius(50)
        insideEarL.setX(7)
        insideEarL.setY(10)
        insideEarL.setColor("silver")

        earL.add(insideEarL)


        const earR = new Shape()
        earR.setHeight(50)
        earR.setWidth(50)
        earR.setRadius(50)
        earR.setX(90)
        earR.setY(-20)
        earR.setZIndex(-1)
        earR.setColor("darkgrey")
        face.add(earR)

        const insideEarR = new Shape()
        insideEarR.setHeight(35)
        insideEarR.setWidth(35)
        insideEarR.setRadius(50)
        insideEarR.setX(7)
        insideEarR.setY(10)
        insideEarR.setColor("silver")
        earR.add(insideEarR)

    }
}