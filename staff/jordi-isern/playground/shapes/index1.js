function Pig(){
    this.container = document.getElementsByClassName('pig')[0]
    this.container.style.position = 'absolute'
}

Pig.prototype.setY = function (value){
    this.container.style.top = value + 'vh'
}
Pig.prototype.setX = function(value) {
    this.container.style.left = value+'vw'
}
Pig.prototype.setZ = function(value){
    this.container.style.transform =  'scale(' + value + ')' 
}
var y = 40
var x = 50
var z = 0
var pig = new Pig()
pig.setY(y)
pig.setX(x)
pig.setZ(1)


document.onkeydown = function(event) {
    if(event.key === 'ArrowUp'){
        y -= 5
        if(y <=0){
            y = 0
        }
    } else if (event.key === 'ArrowDown'){
        y += 5
        if(y >=85){
            y = 85
        }
    } else if (event.key === 'ArrowLeft'){
        x -= 5
        if(x <=0){
            x = 0
        }
    } else if (event.key === 'ArrowRight'){
        x += 5
        if(x >=100){
            x = 100
        }
    } else if(event.key === 'alt'){{
        if(event.key)
    }}

    pig.setY(y)
    pig.setX(x)
    console.log(event.key)
}