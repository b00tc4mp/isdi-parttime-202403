var view = new Component(document.body)
view.addClass('view')

var registerForm = new RegisterForm()

var image = new Image()
image.setSrc('./womanPlayer.png')
image.addClass('womanPlayer')


view.add(image)
view.add(registerForm)


