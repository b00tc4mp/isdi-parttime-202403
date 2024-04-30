function Duck() {
    Shape.call(this)


    this.setColor('transparent')
    this.setHeight(500)
    this.setWidth(450)
    this.setPosition('absolute')
    this.setX(160)
    this.setY(150)


}


Duck.prototype = Object.create(Shape.prototype)
Duck.prototype.constructor = Duck

var contenedor = new Shape()
contenedor.setColor('transparent')
contenedor.setHeight(500)
contenedor.setWidth(450)
contenedor.setPosition('absolute')
contenedor.setX(160)
contenedor.setY(150)

var body = new Shape()
body.setColor('yellow')
body.setHeight(150)
body.setWidth(150)
body.setRadius(50)
body.setPosition('absolute')
body.setX(300)
body.setY(300)
body.setBorderColor('black')



var body2 = new Shape()
body2.setColor('orange')
body2.setHeight(130)
body2.setWidth(220)
body2.setRadius(35)
body2.setPosition('absolute')
body2.setX(320)
body2.setY(400)
body2.setBorderColor('black')

var wing = new Shape()
wing.setColor('#FFCC33')
wing.setHeight(110)
wing.setWidth(170)
wing.setRadius(50)
wing.setPosition('absolute')
wing.setX(350)
wing.setY(400)
wing.setBorderColor('black')

var eyeL = new Shape()
eyeL.setColor('white')
eyeL.setHeight(30)
eyeL.setWidth(30)
eyeL.setRadius(50)
eyeL.setPosition('absolute')
eyeL.setX(290)
eyeL.setY(330)
eyeL.setBorderColor('black')

var pupilL = new Shape()
pupilL.setColor('black')
pupilL.setHeight(4)
pupilL.setWidth(4)
pupilL.setRadius(50)
pupilL.setPosition('absolute')
pupilL.setX(298)
pupilL.setY(335)
pupilL.setBorderColor('black')

var eyeR = new Shape()
eyeR.setColor('white')
eyeR.setHeight(45)
eyeR.setWidth(45)
eyeR.setRadius(50)
eyeR.setPosition('absolute')
eyeR.setX(350)
eyeR.setY(330)
eyeR.setBorderColor('black')

var pupilR = new Shape()
pupilR.setColor('black')
pupilR.setHeight(5)
pupilR.setWidth(5)
pupilR.setRadius(50)
pupilR.setPosition('absolute')
pupilR.setX(375)
pupilR.setY(340)
pupilR.setBorderColor('black')

var pico = new Shape()
pico.setColor('#FF6433')
pico.setHeight(20)
pico.setWidth(90)
pico.setPosition('absolute')
pico.setX(270)
pico.setY(370)
pico.setBorderColor('black')
pico.setRadius(18)



// var x = 200
//var y = 300
//var z = 100


//body.setX(x)
//body.setY(y)

//body2.setX(x)
//body2.setY(y)



contenedor.add(body)
contenedor.add(body2)
body2.add(body)
contenedor.add(eyeL)
contenedor.add(eyeR)
contenedor.add(wing)

document.body.appendChild(contenedor.container)
document.body.appendChild(body2.container)
document.body.appendChild(body.container)
document.body.appendChild(wing.container)
document.body.appendChild(eyeL.container)
document.body.appendChild(eyeR.container)
document.body.appendChild(pupilL.container)
document.body.appendChild(pupilR.container)
document.body.appendChild(pico.container)
