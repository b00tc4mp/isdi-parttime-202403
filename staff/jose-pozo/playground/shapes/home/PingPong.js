var table = new Shape();

table.setBackImage('PingPongTable600x300.jpg');
table.setPosition('top left')
table.setWidth(600);
table.setHeight(300);
table.setBorder(5, 'solid', 'white')
table.addClass('pingPongTable')


document.body.appendChild(table.container);

var paddleL = new Shape()
paddleL.setBackColor('#212121')
paddleL.setWidth(10)
paddleL.setHeight(50)
paddleL.setPosition(20, 125)
paddleL.setRadius(10)

table.add(paddleL.container)

var paddleR = new Shape()
paddleR.setBackColor('#212121')
paddleR.setWidth(10)
paddleR.setHeight(50)
paddleR.setPosition(570, 125)
paddleR.setRadius(10)

table.add(paddleR.container)

var ball = new Shape()
ball.setWidth('10')
ball.setHeight('10')
ball.setRadius('50')
ball.setBackColor('white')
ball.setPosition(290, 140)

table.add(ball.container);