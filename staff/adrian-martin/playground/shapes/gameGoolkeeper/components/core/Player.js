function PlayerLoginRegister(){
    Shape.call(this)


    this.setColor('blue')
    this.setWidth(160)
    this.setHeight(250)
    this.setRadius(35)
    this.setBorder('1px', 'solid', 'black') 

    var lineTorso = new Shape()
        if(player1){    
            lineTorso.setColor('white')
        }else{
            lineTorso.setColor('red')
        }
        lineTorso.setWidth(60)
        lineTorso.setHeight(250)
        lineTorso.setY(0)
        lineTorso.setX(50)   
            
            
    var head = new Shape()
        head.setColor('PeachPuff')
        head.setWidth(140)
        head.setHeight(140)
        head.setRadius(50)
        head.setY(-130)
        head.setX(5)
        head.setBorder()
        head.setBorder('1px', 'solid', 'black')

        this.add(lineTorso)
        this.add(head)
}

PlayerLoginRegister.prototype = Object.create(Shape.prototype)
PlayerLoginRegister.prototype.constructor = PlayerLoginRegister


