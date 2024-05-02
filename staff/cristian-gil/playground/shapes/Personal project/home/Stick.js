function Stick() {
    Shape.call(this)

this.setWidth(100)
this.setHeight(10)
this.setBackground(180,'white','14','#00FFFF','28','#00CCFF','42','#0099FF','56','#00CCFF','70','#00FFFF','84','white','98')
this.setBorder(1, 'transparent', 'grey')
this.setBorderRadius(20)
this.setMarginTop(650)

playingArea.add(this)
}

Stick.prototype = Object.create(Shape.prototype)
Stick.prototype.constructor = Stick