if (!logic.isUserLoggedIn())
    location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')

const userName = logic.getUserName()

const usernameTitle = new Heading(3)
usernameTitle.setText(userName)

header.add(usernameTitle)

const logoutButton = new Button
logoutButton.setText('Cerrar sesión')

logoutButton.onClick(() => {
    logic.logoutUser()

    location.href = '../login'
})

header.add(logoutButton)

const post = new Component('article')

const authorTitle = new Component('p')
authorTitle.setText('SandraCore')

const postTitle = new Component('h2')
postTitle.setText('Que es forEach?')

const postImage = new Image
postImage.setUrl('https://www.configuroweb.com/wp-content/uploads/2023/03/Como-recorrer-un-Array-con-el-metodo-ForEach-en-Javascript.jpg')

const postText = new Component('p')
postText.setText('La función foreach() tiene la función de iterar sobre una colección de elementos, como un array, una lista o cualquier otra estructura de datos iterable, y ejecutar un bloque de código para cada elemento de esa colección. Su propósito principal es simplificar el proceso de recorrer una colección de datos y realizar operaciones en cada uno de sus elementos, sin tener que preocuparse por la gestión de índices o el control del bucle manualmente. Al utilizar foreach(), el código se vuelve más legible y conciso, ya que la sintaxis está diseñada específicamente para este tipo de operaciones, lo que facilita la comprensión del código tanto para los desarrolladores como para quienes lo lean en el futuro. ')

post.add(authorTitle)
post.add(postTitle)
post.add(postImage)
post.add(postText)

view.add(post)

const footer = new Component('footer')
footer.addClass('Footer')

const addPostButton = new Button
addPostButton.setText('+')

footer.add(addPostButton)

view.add(header)
view.add(footer)