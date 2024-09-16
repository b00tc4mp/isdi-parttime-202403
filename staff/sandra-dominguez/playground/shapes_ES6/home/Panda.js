class Face extends Shape {
    constructor() {
        super()

        const earsL = new Shape()
        earsL.setHeight(70)
        earsL.setWidth(70)
        earsL.setRadius(50)
        earsL.setColor('black')
        earsL.moveX(-5)
        earsL.moveY(-20)
        earsL.setzIndex(-1)

        const earsR = new Shape()
        earsR.setHeight(70)
        earsR.setWidth(70)
        earsR.setRadius(50)
        earsR.setColor('black')
        earsR.moveX(140)
        earsR.moveY(-20)
        earsR.setzIndex(-1)

        const pawR = new Shape()
        pawR.setHeight(70)
        pawR.setWidth(70)
        pawR.setRadius(50)
        pawR.setColor('black')
        pawR.moveX(100)
        pawR.moveY(90)
        pawR.setzIndex(-1)

        const pawL = new Shape()
        pawL.setHeight(70)
        pawL.setWidth(70)
        pawL.setRadius(50)
        pawL.setColor('black')
        pawL.moveX(40)
        pawL.moveY(90)
        pawL.setzIndex(-1)

        const eyesL = new Shape()
        eyesL.setHeight(60)
        eyesL.setWidth(60)
        eyesL.setRadius(50)
        eyesL.setColor('black')
        eyesL.moveX(25)
        eyesL.moveY(25)

        const eyesR = new Shape()
        eyesR.setHeight(60)
        eyesR.setWidth(60)
        eyesR.setRadius(50)
        eyesR.setColor('black')
        eyesR.moveX(120)
        eyesR.moveY(25)

        const nose = new Shape()
        nose.setHeight(20)
        nose.setWidth(30)
        nose.setRadius(50)
        nose.setColor('black')
        nose.moveX(90)
        nose.moveY(85)

        const panda = new Shape()
        panda.setColor('white')
        panda.setBorder(3, 'solid', 'black')
        panda.setHeight(130)
        panda.setWidth(200)
        panda.setRadius(50)

        this.add(earsL)
        this.add(earsR)
        this.add(pawL)
        this.add(pawR)

        this.add(panda)
        this.add(eyesL)
        this.add(eyesR)
        this.add(nose)
    }
}