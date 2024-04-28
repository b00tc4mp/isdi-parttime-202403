var view = new Component(document.body)
view.addClass('View')

var welcome = new Heading(1)
welcome.setText("Felicidades! Completaste la 1º parte")
welcome.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
})

view.add(welcome)

var level = new Heading(1)
level.setText("Vea un adelantanto de la  2º Parte")
level.onClick(function () {
    alert('No pestañees')
})

view.add(level)