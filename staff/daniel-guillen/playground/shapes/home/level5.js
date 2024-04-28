var view = new Component(document.body)
view.addClass('View')

var welcome = new Heading(1)
welcome.setText("Llegaste al ultimo nivel!")
welcome.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
})

view.add(welcome)

var level = new Heading(1)
level.setText("Encuentra el punto blanco")
level.onClick(function () {
    alert('usa una lupa si es necesario')
})

view.add(level)

var coma = new Heading(2)
coma.setText(',')
coma.onClick(function () {
    alert('Tienes una obesion con las comas!')
})

view.add(coma)

var coma = new Heading(2)
coma.setText(',')
coma.onClick(function () {
    alert('Otra vez una coma! Empieza de nuevo')
    location.href = "./index.html"
})

view.add(coma)

var nextlevel = new Heading(3)
nextlevel.setText('.')
nextlevel.onClick(function () {
    alert("Ya eres un experto! Pasas al ultimo nivel!")
    location.href = "./level6.html"
})

view.add(nextlevel)

var coma = new Heading(2)
coma.setText(',')
coma.onClick(function () {
    alert('Otra vez una coma! Empieza de nuevo')
    location.href = "./index.html"
})

view.add(coma)