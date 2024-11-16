var view = new Component(document.body)
view.addClass('View')

var welcome = new Heading(1)
welcome.setText("Te convertiras en un experto -  nivel 4")
welcome.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
})

view.add(welcome)

var level1 = new Heading(1)
level1.setText("Encuentra el punto blanco")
level1.onClick(function () {
    alert('si entiedes de colores no sera tan complicado')
})

view.add(level1)

var punto = new Heading(4)
punto.setText('.')
punto.onClick(function () {
    alert('Esto claramente es color hueso')
})

view.add(punto)

var punto = new Heading(3)
punto.setText('.')
punto.onClick(function () {
    alert('Esto es gris')
})

view.add(punto)

var punto = new Heading(4)
punto.setText('.')
punto.onClick(function () {
    alert('Esto claramente es color hueso')
})

view.add(punto)

var punto = new Heading(3)
punto.setText('.')
punto.onClick(function () {
    alert('Esto es gris')
})

view.add(punto)

var punto = new Heading(3)
punto.setText('.')
punto.onClick(function () {
    alert('Esto es gris')
})

view.add(punto)

var punto = new Heading(4)
punto.setText('.')
punto.onClick(function () {
    alert('Esto claramente es color hueso')
})

view.add(punto)

var nextlevel = new Heading(2)
nextlevel.setText('.')
nextlevel.onClick(function () {
    alert("Ya eres un experto! Pasas al ultimo nivel!")
    location.href = "./level5.html"
})

view.add(nextlevel)

var punto = new Heading(4)
punto.setText('.')
punto.onClick(function () {
    alert('Esto claramente es color hueso')
})

view.add(punto)

var punto = new Heading(3)
punto.setText('.')
punto.onClick(function () {
    alert('Esto es gris')
})

view.add(punto)

var punto = new Heading(4)
punto.setText('.')
punto.onClick(function () {
    alert('Esto claramente es color hueso')
})

view.add(punto)