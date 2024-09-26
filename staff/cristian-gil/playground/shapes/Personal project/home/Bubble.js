function Bubble() {
    Shape.call(this)

this.setWidth(100)
this.setHeight(100)
this.setBackground(45, 'silver', '5', 'lightblue', '20', 'skyblue', '30', 'white', '60', 'skyblue', '85', 'lightblue', '97', 'blue', '99')
this.setBorder(1, 'transparent', 'blue')
this.setBorderRadius(50)
this.setDisplay('flex')
this.setBoxShadow(0, 0, 20, 0, 'rgba(0,0,255,0.3)')
this.setAlignItems('center')
this.setJustifyItems('center')

playingArea.add(this)

var LightUp = new Shape()
LightUp.setWidth(5)
LightUp.setHeight(15)
LightUp.setBorder(1, 'solid', 'white')
LightUp.setOpacity(0.8)
LightUp.setBackgroundColor('snow')
LightUp.setBorderRadius(35)
LightUp.setPosition('absolute')
LightUp.setMarginLeft(25)
LightUp.setMarginBottom(65)
LightUp.setTransform('skew','-45', '0')

this.add(LightUp)


var LightDown = new Shape()
LightDown.setWidth(5)
LightDown.setHeight(10)
LightDown.setBorder(1, 'solid', 'snow')
LightDown.setOpacity(0.5)
LightDown.setBackgroundColor('snow')
LightDown.setBorderRadius(35)
LightDown.setPosition('absolute')
LightDown.setMarginLeft(70)
LightDown.setMarginBottom(-60)
LightDown.setTransform('skew','-45','0')

this.add(LightDown)
}

Bubble.prototype = Object.create(Shape.prototype)
Bubble.prototype.constructor = Bubble
