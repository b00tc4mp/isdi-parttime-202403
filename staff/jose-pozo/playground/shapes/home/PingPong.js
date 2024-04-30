function PingPong() {
    Shape.call(this);

    this.addClass('PingPong')

    var paddleL = new Shape()
    paddleL.addClass('paddle-left')

    var paddleR = new Shape()
    paddleR.addClass('paddle-rigth')

    var ball = new Shape()
    ball.addClass('ball')

    this.add(paddleL)
    this.add(paddleR)
    this.add(ball)


    var yPaddleL = 125;
    var yPaddleR = 125;
    var tableHeight = 295;

    document.onkeydown = function (event) {
        if (event.key === 'w') {
            if (yPaddleL > 0) {
                yPaddleL -= 10;
                paddleL.setPosition(20, yPaddleL);
            }
        } else if (event.key === 's') {
            if (yPaddleL + 45 < tableHeight) {
                yPaddleL += 10;
                paddleL.setPosition(20, yPaddleL);
            }
        } else if (event.key === "ArrowUp") {
            if (yPaddleR > 0) {
                yPaddleR -= 10;
                paddleR.setPosition(570, yPaddleR);
            }
        } else if (event.key === "ArrowDown") {
            if (yPaddleR + 45 < tableHeight) {
                yPaddleR += 10;
                paddleR.setPosition(570, yPaddleR);
            }
        }
    }

    var xBall = 290;
    var yBall = 140;
    var xSpeedBall = 1.2;
    var ySpeedBall = 0.3;

    function moveBall() {
        xBall += xSpeedBall;
        yBall += ySpeedBall;

        if (xBall <= 0 || xBall + 10 >= 600) {
            xSpeedBall = -xSpeedBall;
        } else if (yBall <= 0 || yBall + 10 >= 300) {
            ySpeedBall = -ySpeedBall;
        }

        if (xBall <= 30 && yBall >= yPaddleL && yBall <= yPaddleL + 50) {
            xSpeedBall = -xSpeedBall;
        } else if (xBall + 10 >= 570 && yBall >= yPaddleR && yBall <= yPaddleR + 50) {
            xSpeedBall = -xSpeedBall;
        }

        ball.setPosition(xBall, yBall);
    }

    setInterval(moveBall);

}

PingPong.prototype = Object.create(Shape.prototype)
PingPong.prototype.constructor = PingPong