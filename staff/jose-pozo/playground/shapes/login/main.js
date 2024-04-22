var view = new Component(document.body)
view.addClass('view')

var LoginForm = new LoginForm()

var image = new Image()
image.setSrc('./manPlayer.png')
image.addClass('manPlayer')

view.add(image)
view.add(LoginForm)

