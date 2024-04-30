if (logic.isUserLoggedIn())
    location.href = '../home'

    const view = new Component(document.body)
view.addClass('View')

const welcome4 = new Heading(1)
welcome4.setText("Te convertiras en un experto -  nivel 4")
welcome4.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
})

view.add(welcome4)

const level4 = new Heading(1)
level4.setText("Encuentra el punto blanco")
level4.onClick(function () {
    alert('si entiedes de colores no sera tan complicado')
})

view.add(level4)

var sym1 = new Heading(4)
sym1.setText('.')
sym1.onClick(function () {
    alert('Esto claramente es color hueso')
})

view.add(sym1)

var sym2 = new Heading(3)
sym2.setText('.')
sym2.onClick(function () {
    alert('Esto es gris')
})

view.add(sym2)

var sym3 = new Heading(4)
sym3.setText('.')
sym3.onClick(function () {
    alert('Esto claramente es color hueso')
})

view.add(sym3)

var sym4 = new Heading(3)
sym4.setText('.')
sym4.onClick(function () {
    alert('Esto es gris')
})

view.add(sym4)

var sym5 = new Heading(3)
sym5.setText('.')
sym5.onClick(function () {
    alert('Esto es gris')
})

view.add(sym5)

var sym6 = new Heading(4)
sym6.setText('.')
sym6.onClick(function () {
    alert('Esto claramente es color hueso')
})

view.add(sym6)

var sym7 = new Heading(2)
sym7.setText('.')
sym7.onClick(function () {
    alert("Ya eres un experto! Pasas al ultimo nivel!")
    location.href = "./level5.html"
})

view.add(sym7)

var sym8 = new Heading(4)
sym8.setText('.')
sym8.onClick(function () {
    alert('Esto claramente es color hueso')
})

view.add(sym8)

var sym9 = new Heading(3)
sym9.setText('.')
sym9.onClick(function () {
    alert('Esto es gris')
})

view.add(sym9)

var sym10 = new Heading(4)
sym10.setText('.')
sym10.onClick(function () {
    alert('Esto claramente es color hueso')
})

view.add(sym10)