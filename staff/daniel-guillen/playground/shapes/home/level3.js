var view = new Component(document.body)
view.addClass('View')

var welcome = new Heading(1)
welcome.setText("Se paso con el bronceado -  nivel 4")
welcome.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
})

view.add(welcome)

var level1 = new Heading(1)
level1.setText("Encuentra el punto blanco")
level1.onClick(function () {
    alert('si alguna vez pasaste demasiado tiempo al sol lo entenderas')
})

view.add(level1)

var punto = new Heading(3)
punto.setText('.')
punto.onClick(function () {
    alert('Este ya deberia buscar sombra')
})

view.add(punto)

var punto = new Heading(5)
punto.setText('.')
punto.onClick(function () {
    alert('Este tiene un problema en el higado')
})

view.add(punto)

var punto = new Heading(6)
punto.setText('.')
punto.onClick(function () {
    alert('Poco a la playa ha ido')
})

view.add(punto)

var punto = new Heading(3)
punto.setText('.')
punto.onClick(function () {
    alert('Este ya deberia buscar sombra')
})

view.add(punto)

var nextlevel = new Heading(2)
nextlevel.setText('.')
nextlevel.onClick(function () {
    alert("Rojo como una gamba! Muy bien pasas de nivel!")
    location.href = "./level4.html"
})

view.add(nextlevel)

var punto = new Heading(4)
punto.setText('.')
punto.onClick(function () {
    alert('Este jamas ha ido a la playa')
})

view.add(punto)