function Player() {
    Shape.call(this)

    this.x = 0
    this.y = 0

    this.setColor('blue')
    this.setWidth(30)
    this.setHeight(50)
    this.setRadius(35)   

    // camp.add(this)

    var lineTorso = new Shape
        if(player1){    
            lineTorso.setColor('white')
        }else{
            lineTorso.setColor('red')
        }
        lineTorso.setWidth(10)
        lineTorso.setHeight(50)
        lineTorso.setY(0)
        lineTorso.setX(10)   
            
            
    var head = new Shape()
        head.setColor('PeachPuff')
        head.setWidth(25)
        head.setHeight(25)
        head.setRadius(50)
        head.setY(-20)
        head.setX(2)

        this.add(lineTorso)
        this.add(head)
}

Player.prototype = Object.create(Shape.prototype)
Player.prototype.constructor = Player



