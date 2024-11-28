var x =Math.random()*900
        var y =Math.random()*100
        var yy = y+100
        var xx = x+50
        var z = 500
        var difx=1
        var dify=1
        var difz=10
        
        
        var playingArea = new PlayingArea()
       
        var bubble = new Bubble()

        var stick = new Stick()

        document.body.appendChild(playingArea.container)


//MOVIMIENTO BURBUJA
        function movementBubble(){
            if(x <= 0){difx=1}
            if(x >= 900){difx=(-1)}
            if(y <= 0){dify=1}
            if(yy >= 650 && yy <=660 && xx>=z && xx<=z+100){dify=(-1)}
            if(y >= 600){return false}
            bubble.setMarginTop(y)
            bubble.setMarginLeft(x)
            x=x+difx
            y=y+dify
            yy = y+100
            xx = x+50
            return true
        }

//MOVIMIENTO PALITO
        document.onkeydown = function (movementStick){
            if(movementStick.key === 'ArrowLeft'){difz=(-10)}
            if(movementStick.key === 'ArrowRight'){difz=10}
            if(z<=0){difz=0
            z=1}
            if(z>=900){difz=0
            z=899}
            stick.setMarginLeft(z)
            z=z+difz
        }


//INTERVALO
        setInterval(function(){var isMovementBubble = movementBubble();
            if(isMovementBubble === false){clearInterval()}
            movementStick();
        },1)
         
    