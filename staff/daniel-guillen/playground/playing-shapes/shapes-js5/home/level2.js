var view = new Component(document.body)
view.addClass('View')

var welcome = new Heading(1)
welcome.setText("No se te da mal -  nivel 2")
welcome.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
})

view.add(welcome)

var level1 = new Heading(1)
level1.setText("Encuentra el punto blanco aplastado por un elefante")
level1.onClick(function () {
    alert('esto se complica... el punto esta irreconocible')
})

view.add(level1)

var cotilla = new Heading(2)
cotilla.setText ('¨')
cotilla.onClick(function () {
    alert('Este vio todo lo que paso y no hizo nada')
})

view.add(cotilla)

var mujer = new Heading(2)
mujer.setText('.')
mujer.onClick(function () {
    alert('Esta es la mujer y no lo reconoce')
})

view.add(mujer)

var coma = new Heading(2)
coma.setText(',')
coma.onClick(function () {
    alert('Fijate bien, esto es una coma')
})

view.add(coma)

var punto = new Heading(2)
punto.setText('.')
punto.onClick(function () {
    alert('Asi era antes de la tragedia')
})

view.add(punto)

var nextlevel = new Heading(2)
nextlevel.setText('-')
nextlevel.onClick(function () {
    alert("Fueron más  de 5 toneladas, muy bien pasas de nivel!")
    location.href = "./level3.html"
})

view.add(nextlevel)

var coma = new Heading(2)
coma.setText(',')
coma.onClick(function () {
    alert('¿Otra vez? Esto es una coma, vuelve a empezar')
    location.href = "./index.html"
})

view.add(coma)