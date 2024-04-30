if (logic.isUserLoggedIn())
    location.href = '../home'

    const view = new Component(document.body)
view.addClass('View')

const welcome3 = new Heading(1)
welcome3.setText("Se paso con el bronceado -  nivel 3")
welcome3.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
})

view.add(welcome3)

const level3 = new Heading(1)
level3.setText("Encuentra el punto no tan blanco")
level3.onClick(function () {
    alert('si alguna vez pasaste demasiado tiempo al sol lo entenderas')
})

view.add(level3)

let sym1 = new Heading(3)
sym1.setText('.')
sym1.onClick(function () {
    alert('Este ya deberia buscar sombra')
})

view.add(sym1)

let sym2 = new Heading(5)
sym2.setText('.')
sym2.onClick(function () {
    alert('Este tiene un problema en el higado')
})

view.add(sym2)

let sym3 = new Heading(6)
sym3.setText('.')
sym3.onClick(function () {
    alert('Poco a la playa ha ido')
})

view.add(sym3)

let sym4 = new Heading(3)
sym4.setText('.')
sym4.onClick(function () {
    alert('Este ya deberia buscar sombra')
})

view.add(sym4)

let sym5 = new Heading(2)
sym5.setText('.')
sym5.onClick(function () {
    alert("Rojo como una gamba! Muy bien pasas de nivel!")
    location.href = "./level4.html"
})

view.add(sym5)

let sym6 = new Heading(4)
sym6.setText('.')
sym6.onClick(function () {
    alert('Este jamas ha ido a la playa')
})

view.add(sym6)