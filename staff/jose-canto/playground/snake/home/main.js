var body = new Snake() // instancia de Snake

//coordenadas centradas
var x = (window.innerWidth - 100) / 2
var y = (window.innerHeight - 100) / 2

// ventana
body.setBackground("#B48B7D")
body.setWindowBorder("solid", 10)


// Cuerpo Snake
var snakeWidth = 20
var snakeHeight = 20
var snakeColor = "green"

var imgMiniManu = "../img/snake.jpg" // IMG

var snake = new Snake()

snake.backgroundImage(imgMiniManu)
snake.setColor(snakeColor)
snake.borderRadius(25)
snake.setHeight(snakeHeight)
snake.setWidth(snakeWidth)

body.add(snake)

// random coordenadas
function randomCoordenate() {
  var randomX = Math.floor(Math.random() * (window.innerWidth - 40))
  var randomY = Math.floor(Math.random() * (window.innerHeight - 40))
  return {
    x: randomX,
    y: randomY
  }
}

var circleCoordenate = randomCoordenate()

// Circle 
var circle = new Snake()
var circleColor = "black"
circle.setColor(circleColor)
circle.setHeight(20)
circle.setWidth(20)
circle.borderRadius(50)
circle.setX(circleCoordenate.x)
circle.setY(circleCoordenate.y)

body.add(circle)

// movimiento snake
var direction = "right"
setInterval(moveSnake, 20)

function moveSnake() {

  if (direction === "left") {
    x -= 10;
    if (x < 0) {
      x = window.innerWidth - 50;
    }
  } else if (direction === "right") {
    x += 10;
    if (x > window.innerWidth - 50) {
      x = 0;
    }
  } else if (direction === "up") {
    y -= 10;
    if (y < 0) {
      y = window.innerHeight - 50;
    }
  } else if (direction === "down") {
    y += 10;
    if (y > window.innerHeight - 50) {
      y = 0;
    }
  }
  snake.setX(x);
  snake.setY(y);

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  var randomColorSnake = getRandomColor();

  // Obtener las coordenadas reales de la serpiente y el círculo
  var snakeRect = snake.container.getBoundingClientRect(); // método getBoundingClientRect(). Este método devuelve un objeto con las coordenadas del elemento, relativas al área de la ventana gráfica.
  var circleRect = circle.container.getBoundingClientRect();

  // Verificar colisión utilizando las coordenadas reales
  if (isColliding(snakeRect, circleRect)) {

    //circle
    circleCoordenate = randomCoordenate();
    circle.setX(circleCoordenate.x);
    circle.setY(circleCoordenate.y);
    circleColor = getRandomColor()
    circle.setColor(circleColor)

    //snake
    snakeHeight += 10
    snakeWidth += 10
    snake.setHeight(snakeHeight)
    snake.setWidth(snakeWidth)
    snakeColor = randomColorSnake
    snake.setColor(snakeColor)
  }
}

function isColliding(snakeRect, circleRect) {
  // Comprobar si los rectángulos no se superponen en cualquiera de los ejes
  if (snakeRect.right < circleRect.left) {
    // El rectángulo 1 está completamente a la izquierda del rectángulo 2
    return false;
  }
  if (snakeRect.left > circleRect.right) {
    // El rectángulo 1 está completamente a la derecha del rectángulo 2

    return false;
  }
  if (snakeRect.bottom < circleRect.top) {
    // El rectángulo 1 está completamente arriba del rectángulo 2

    return false;
  }
  if (snakeRect.top > circleRect.bottom) {
    // El rectángulo 1 está completamente debajo del rectángulo 2
    return false;
  }

  // Si no se cumple ninguna de las condiciones anteriores, los rectángulos se superponen
  return true;
}

document.onkeydown = function (event) {
  if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  } else if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  }
}

document.body.appendChild(body.container)