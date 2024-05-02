function Shape() {
    this.container = document.createElement('div')
    this.container.style.position='absolute'
}
//WIDTH
Shape.prototype.setWidth = function (value) {
    this.container.style.width = value + 'px'
}

//HEIGHT
Shape.prototype.setHeight = function (value) {
    this.container.style.height = value + 'px'
}

//BORDER
Shape.prototype.setBorder = function (value, style, color) {
    this.container.style.border = value + 'px ' + style + ' ' + color
}

//BORDER-RADIUS
Shape.prototype.setBorderRadius = function (value) {
    this.container.style.borderRadius = value+'%'
}

//DISPLAY
Shape.prototype.setDisplay = function (value) {
    this.container.style.display = value
}

//MARGIN-TOP
Shape.prototype.setMarginTop = function (value) {
    this.container.style.marginTop = value +'px'
}

//MARGIN-LEFT
Shape.prototype.setMarginLeft = function (value) {
    this.container.style.marginLeft = value+'px'
}

//MARGIN-BOTTOM
Shape.prototype.setMarginBottom = function (value) {
    this.container.style.marginBottom = value+'px'
}

//TOP
Shape.prototype.setY = function (value) {
    this.container.style.top = value +'px'
}

//LEFT
Shape.prototype.setX = function (value) {
    this.container.style.left = value+'px'
}
//BACKGROUND
Shape.prototype.setBackground = function (value, color1, perc1, color2, perc2, color3, perc3, color4, perc4, color5, perc5, color6, perc6, color7, perc7) {
    this.container.style.background = 'linear-gradient(' + value + 'deg, ' + color1 + ' ' + perc1 + '%, ' + color2 + ' ' + perc2 + '%, ' + color3 + ' ' + perc3 + '%, ' + color4 + ' ' + perc4 + '%, ' + color5 + ' ' + perc5 + '%, ' + color6 + ' ' + perc6 + '%, ' + color7 + ' ' + perc7 + '%)';
}

//BACKGROUND-COLOR
Shape.prototype.setBackgroundColor = function (value) {
    this.container.style.backgroundColor = value;
}

//OPACIDAD
Shape.prototype.setOpacity = function (value) {
    this.container.style.opacity = value
}

//BOX-SHADOW
Shape.prototype.setBoxShadow = function (offsetX, offsetY, radius, spreadRadius, color) {
    this.container.style.boxShadow = offsetX +' '+ offsetY +' '+ radius+'px '+ spreadRadius +' '+ color  
}

//ALIGN-ITEMS
Shape.prototype.setAlignItems = function (value) {
    this.container.style.alignItems = value
}

//JUSTIFY-ITEMS
Shape.prototype.setJustifyItems = function (value) {
    this.container.style.justifyItems = value
}

//POSITION
Shape.prototype.setPosition = function (value) {
    this.container.style.position = value
}

//TRANSFORM
Shape.prototype.setTransform = function (value1, value2, value3) {
    this.container.style.transform = value1 +'(' + value2 + 'deg,' + value3 + 'deg)'
    //'skew(-45deg,0deg)'
}

Shape.prototype.add = function (child) {
    this.container.appendChild(child.container)
}