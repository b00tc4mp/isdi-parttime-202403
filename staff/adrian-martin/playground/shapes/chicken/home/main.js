document.body.style.backgroundColor = 'MediumSeaGreen'

var chicken = new Chicken()
chicken.config('ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight')
chicken.move(100, 100, 0)

var chicken2 = new Chicken()
chicken2.config('w', 's', 'a', 'd')
chicken2.move(300, 300, 0)

var chicken3 = new Chicken()
chicken3.config('y', 'h', 'g', 'j')
chicken3.move(400, 200, 0)

var step = 20

var applyOnY = false

var actors = [chicken, chicken2, chicken3]

document.onkeydown = function(event) {
    var key = event.key.toLowerCase()

    actors.forEach(function (actor) {

        if (key === actor.keyLeft)
            actor.setXRelative(-step)

        else if(key === actor.keyRight)
            actor.setXRelative(step)

        else if(key === actor.keyUp){
        if(!applyOnY)
            actor.setYRelative(-step)
        else
            actor.setYRelative(-step)

        }else if(key === actor.keyDown){
        if(!applyOnY)
            actor.setYRelative(step)
        else
            actor.setZRelative(step)

        }
    })

    if(event.key === 'Alt')
    applyOnY = true

}

document.onkeyup = function(event){
    console.log(event.key)

    if(event.key === 'Alt')
    applyOnY = false
}

actors.forEach(function (actor) {
    document.body.appendChild(actor.container)
})