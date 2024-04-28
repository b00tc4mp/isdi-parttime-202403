var view = new Component(document.body)
view.addClass('View')

var welcome = new Heading(1)
welcome.setText("Bienvenido al nivel 1")
welcome.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
})

view.add(welcome)

var level1 = new Heading(1)
level1.setText("Encuentra el punto blanco")
level1.onClick(function () {
    alert('usa tus habilidades... si las tienes para  encontrar el punto blanco')
})

view.add(level1)

var children = new Heading(2)
children.setText ('·')
children.onClick(function () {
    alert('Entiendo tu confusion, es un pariente cercano del punto que buscamos')
})

view.add(children)

var dosPuntos = new Heading(2)
dosPuntos.setText(':')
dosPuntos.onClick(function () {
    alert('Estos son dos y buscamos uno')
})

view.add(dosPuntos)

var primo = new Heading(2)
primo.setText('*')
primo.onClick(function () {
    alert('No!')
})

view.add(primo)

var coma = new Heading(2)
coma.setText(',')
coma.onClick(function () {
    alert('¿En  serio? Esto es una coma')
})

view.add(coma)

var nextlevel = new Heading(2)
nextlevel.setText('.')
nextlevel.onClick(function () {
    alert("Este era facil, muy bien pasas de nivel!")
    location.href = "./level2.html"
})

view.add(nextlevel)