if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const congratulation = new Heading(1)
congratulation.setText("Felicidades! Completaste la 1º parte")
congratulation.onClick(function () {
    alert('Menudo susto!')
})

view.add(congratulation)

let isComming = new Heading(1)
isComming.setText("Vea un adelantanto de la  2º Parte")
isComming.onClick(function () {
    alert('No pestañees')
})

view.add(isComming)