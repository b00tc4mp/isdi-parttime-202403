document.body.style.backgroundColor = 'LawnGreen'

var camp = new Shape
camp.setColor('ForestGreen')
camp.setWidth(1200)
camp.setHeight(800)
camp.setX(10)
camp.setY(10)

var line1 = new Shape()
line1.setColor('aliceBlue')
line1.setWidth(15)
line1.setHeight(700)
line1.setX(30)
line1.setY(100)

camp.add(line1)

var line2 = new Shape()
line2.setColor('aliceBlue')
line2.setWidth(15)
line2.setHeight(700)
line2.setX(1150)
line2.setY(100)

camp.add(line2)

var line3 = new Shape()
line3.setColor('aliceBlue')
line3.setWidth(1120)
line3.setHeight(15)
line3.setX(40)
line3.setY(100)

camp.add(line3)

var line4 = new Shape()
line4.setColor('aliceBlue')
line4.setWidth(920)
line4.setHeight(15)
line4.setX(130)
line4.setY(400)

camp.add(line4)

var line5 = new Shape()
line5.setColor('aliceBlue')
line5.setWidth(15)
line5.setHeight(400)
line5.setX(130)
line5.setY(400)

camp.add(line5)

var line6 = new Shape()
line6.setColor('aliceBlue')
line6.setWidth(15)
line6.setHeight(400)
line6.setX(1050)
line6.setY(400)

camp.add(line6)

var circlePenalty = new Shape()
circlePenalty.setColor('aliceBlue')
circlePenalty.setRadius(50)
circlePenalty.setWidth(65)
circlePenalty.setHeight(65)
circlePenalty.setX(560)
circlePenalty.setY(180)

camp.add(circlePenalty)

// Porter's Lodge

var gridL = new Shape()
gridL.setColor('aliceBlue')
gridL.setWidth(15)
gridL.setHeight(50)
gridL.setX(230)
gridL.setY(750)

camp.add(gridL)

var gridR = new Shape()
gridR.setColor('aliceBlue')
gridR.setWidth(15)
gridR.setHeight(50)
gridR.setX(950)
gridR.setY(750)

camp.add(gridR)

//Posicion de la Porteria
// var goalLeftX = 230;
// var goalRightX = 950;
// var goalY = 800;