
if (!logic.isUserLoggedIn())
    location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const welcome1 = new Heading(1)
welcome1.setText("Bienvenido al nivel 1")
welcome1.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
})

view.add(welcome1)

const level1 = new Heading(1)
level1.setText("Encuentra el punto blanco")
level1.onClick(function () {
    alert('usa tus habilidades... si las tienes para  encontrar el punto blanco')
})

view.add(level1)

const children = new Heading(2)
children.setText ('·')
children.onClick(function () {
    alert('Entiendo tu confusion, es un pariente cercano del punto que buscamos')
})

view.add(children)

let sym1 = new Heading(2)
sym1.setText(':')
sym1.onClick(function () {
    alert('Estos son dos y buscamos uno')
})

view.add(sym1)

let sym2 = new Heading(2)
sym2.setText('*')
sym2.onClick(function () {
    alert('No!')
})

view.add(sym2)

let sym3 = new Heading(2)
sym3.setText(',')
sym3.onClick(function () {
    alert('¿En  serio? Esto es una coma')
})

view.add(sym3)

let sym4 = new Heading(2)
sym4.setText('.')
sym4.onClick(function () {
    alert("Este era facil, muy bien pasas de nivel!")
    location.href = "./level2.html"
})

view.add(sym4)