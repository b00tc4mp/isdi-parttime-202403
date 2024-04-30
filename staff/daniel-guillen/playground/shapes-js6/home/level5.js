if (logic.isUserLoggedIn())
    location.href = '../home'

    const view = new Component(document.body)
view.addClass('View')

const welcome5 = new Heading(1)
welcome5.setText("Llegaste al ultimo nivel!")
welcome5.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
})

view.add(welcome5)

const level5 = new Heading(1)
level5.setText("Encuentra el punto blanco")
level5.onClick(function () {
    alert('usa una lupa si es necesario')
})

view.add(level5)

let sym1 = new Heading(2)
sym1.setText(',')
sym1.onClick(function () {
    alert('Tienes una obesion con las comas!')
})

view.add(sym1)

let sym2 = new Heading(2)
sym2.setText(',')
sym2.onClick(function () {
    alert('Otra vez una coma! Empieza de nuevo')
    location.href = "./index.html"
})

view.add(sym2)

let sym3 = new Heading(3)
sym3.setText('.')
sym3.onClick(function () {
    alert("Felicidades!!!")
    location.href = "./level6.html"
})

view.add(sym3)

let sym4 = new Heading(2)
sym4.setText(',')
sym4.onClick(function () {
    alert('Otra vez una coma! Empieza de nuevo')
    location.href = "./index.html"
})

view.add(sym4)