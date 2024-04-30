class Pig extends Shape {
  constructor() {
      super()

      this.setColor('pink')
      this.setHeight(100)
      this.setWidth(100)
      this.moveX(50)
      this.moveY(170)

      const eyeL = new Shape()
      eyeL.setHeight(50)
      eyeL.setWidth(50)
      eyeL.setRadius(50)
      eyeL.setColor('black')
      eyeL.moveX(30)
      eyeL.moveY(30)

      const eyeR = new Shape()
      eyeR.setHeight(50)
      eyeR.setWidth(50)
      eyeR.setRadius(50)
      eyeR.setColor('white')
      eyeR.moveX(90)
      eyeR.moveY(30)

      const face = new Shape()
      face.setColor('pink')
      face.setHeight(200)
      face.setWidth(200)
      face.setRadius(50)
      face.moveY(-170)
      face.moveX(-60)

      face.add(eyeL)
      face.add(eyeR)

      this.add(face)

      const footL = new Shape()
      footL.setColor('pink')
      footL.setHeight(100)
      footL.setWidth(50)
      footL.moveX(-20)
      footL.moveY(100)

      this.add(footL)

      const footR = new Shape()
      footR.setColor('pink')
      footR.setHeight(100)
      footR.setWidth(50)
      footR.moveX(80)
      footR.moveY(100)

      this.add(footR)
  }
}