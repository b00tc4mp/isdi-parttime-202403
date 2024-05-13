if (!logic.isUserLoggedIn())
    location.href = '../login'

    const view = new Component(document.body)
view.addClass('View')

let welcome2 = new Heading(1)
welcome2.setText("No se te da mal -  nivel 2")
welcome2.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
})

view.add(welcome2)

let level2 = new Heading(1)
level2.setText("Encuentra el punto blanco aplastado por un elefante")
level2.onClick(function () {
    alert('esto se complica... el punto esta irreconocible')
})

view.add(level2)

let sym1 = new Heading(2)
sym1.setText ('¨')
sym1.onClick(function () {
    alert('Este vio todo lo que paso y no hizo nada')
})

view.add(sym1)

let sym2 = new Heading(2)
sym2.setText('.')
sym2.onClick(function () {
    alert('Esta es la mujer y no lo reconoce')
})

view.add(sym2)

let sym3 = new Heading(2)
sym3.setText(',')
sym3.onClick(function () {
    alert('Fijate bien, esto es una coma')
})

view.add(sym3)

let sym4 = new Heading(2)
sym4.setText('.')
sym4.onClick(function () {
    alert('Asi era antes de la tragedia')
})

view.add(sym4)

let sym5 = new Heading(2)
sym5.setText('-')
sym5.onClick(function () {
    alert("Fueron más  de 5 toneladas, muy bien pasas de nivel!")
    location.href = "./level3.html"
})

view.add(sym5)

let sym6 = new Heading(2)
sym6.setText(',')
sym6.onClick(function () {
    alert('¿Otra vez? Esto es una coma, vuelve a empezar')
    location.href = "./index.html"
})

view.add(sym6)