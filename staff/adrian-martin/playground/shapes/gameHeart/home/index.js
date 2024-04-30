var view = new Component(document.body)
view.addClass('View')

var heart = new Heart()
heart.setX(300)
heart.setY(300)

var x = 300
var y = 300

document.onkeydown = function(event) {
    if (event.key === 'ArrowLeft')
        x -= 20

    else if(event.key === 'ArrowRight')
        x += 20

    else if(event.key === 'ArrowUp')
        y -= 20

    else if(event.key === 'ArrowDown')
        y += 20

    heart.setX(x)
    heart.setY(y)
}



view.add(heart)


