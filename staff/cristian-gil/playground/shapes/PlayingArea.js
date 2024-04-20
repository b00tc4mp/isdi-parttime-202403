function PlayingArea() {
        
    Shape.call(this)
    this.setWidth(1000)
    this.setHeight(700)
    this.setDisplay('flex')
    this.setBorder(30, 'solid', 'cyan')
    this.setMarginTop(30)
    this.setMarginLeft(30)
    this.setBackground(180, 'rgb(0,0,35.5)','14','rgb(0,0,71)','28','rgb(0,0,106.5)','42','rgb(0,0,142)','56','rgb(0,0,177.5)','70','rgb(0,0,213)','84','rgb(0,0,255)','98')
    }

    PlayingArea.prototype = Object.create(Shape.prototype)
    PlayingArea.prototype.constructor = PlayingArea