var koala= new Koala()

koala.setX(x)
koala.setY(y)

var x = 300
var y = 300
var step = 20

document.onkeydown = function (event) {
    if (event.key === "ArrowLeft")
        x -= step
    else if (event.key === "ArrowRight")
        x += step
    else if (event.key === "ArrowUp")
        y -= step
    else if (event.key === "ArrowDown")
        y += step
    koala.setX(x)
    koala.setY(y)

}

setInterval(() => koala.setY(y + (Math.random() * (300 - 200) + 200)), 2000);
setInterval(() => koala.setX(x + (Math.random() * (300 - 200) + 200)), 2000)

document.body.appendChild(koala.container)
