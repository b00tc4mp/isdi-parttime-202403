//Posicion de la Porteria
var goalLeftX = 230;
var goalRightX = 950;
var goalY = 800;

//Posocion Pelota
var ballX = 572
var ballY = 193

//Posición y dimensiones del torso del jugador
var x = 572;
var y = 670; 
var torsoWidth = 30;
var torsoHeight = 50; 

var ball = new Shape()
ball.setColor('black')
ball.setRadius(50)
ball.setWidth(40)
ball.setHeight(40)
ball.setX(ballX)
ball.setY(ballY)

camp.add(ball)

function resetBallPosition() {
    ballX = 572
    ballY = 193
    ball.setX(ballX)
    ball.setY(ballY)
}

function goal(){
    return ballX >= goalLeftX && ballX <= goalRightX && ballY <= goalY
}

function shootPenalty(){
    //Movimiento de la Pelota
    var targetX = Math.random() * (goalRightX - goalLeftX) + goalLeftX;

    //Calcular la Trayectoria
    var totalFrames = 100
    var currentFrame = 0

    var dx = (targetX - ballX) / totalFrames
    var dy = (ballY - 750) / totalFrames

    var ballInterval = setInterval(function() {
        ballX += dx;
        ballY -= dy;
        ball.setX(ballX)
        ball.setY(ballY)
        currentFrame++

        //Verificar colision Torso
        if (ballX >= x && ballX <= x + torsoWidth && ballY >= y && ballY <= y + torsoHeight) {
            clearInterval(ballInterval);
            resetBallPosition();
}

        //Dedtener el Movimiento
        if(currentFrame >= totalFrames) {
            clearInterval(ballInterval)
            if (goal())
                resetBallPosition();
        }

    //Intervalo entre Fotograma
    }, 20)
}

shootPenalty();

var player1 = new Player()
player1.setX(572)
player1.setY(670)
 
var player2 = new Player()
player2.setColor('black')
player2.setX(610)
player2.setY(170)



//Movimiento del Jugador
document.onkeydown = function(event){
    if(event.key === 'ArrowLeft')
        x -= 30 
        if(x < goalLeftX + 50 && x > goalLeftX - 50){
            shootPenalty()
        }
    else if(event.key === 'ArrowRight')
        x += 30
        if(x < goalLeftX + 50 && x > goalLeftX - 50){
            shootPenalty()
        }
    player1.setX(x)
}

document.body.appendChild(camp.container)