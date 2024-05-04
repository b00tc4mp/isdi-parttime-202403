if (!logic.isUserLoggedIn())
    location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')
view.add(header)

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

const main = new Component('main')
view.add(main)

const postList = new Component('section')
main.add(postList)


//esta info esta guardada en localStorage

//{
//    const postData = {
//        author: 'SandraCore',
//        title: 'Que es forEach?',
//        image: 'https://www.configuroweb.com/wp-content/uploads/2023/03/Como-recorrer-un-Array-con-el-metodo-ForEach-en-Javascript.jpg',
//        text: 'La función foreach() tiene la función de iterar sobre una colección de elementos, como un array, una lista o cualquier otra estructura de datos iterable, y ejecutar un bloque de código para cada elemento de esa colección. Su propósito principal es simplificar el proceso de recorrer una colección de datos y realizar operaciones en cada uno de sus elementos, sin tener que preocuparse por la gestión de índices o el control del bucle manualmente. Al utilizar foreach(), el código se vuelve más legible y conciso, ya que la sintaxis está diseñada específicamente para este tipo de operaciones, lo que facilita la comprensión del código tanto para los desarrolladores como para quienes lo lean en el futuro.'
//    }
//
//    const post = new Post(postData)
//
//    postList.add(post)
//}
//
//{
//    const postData = {
//        author: 'SandraCore',
//        title: 'Que es forEach?',
//        image: 'https://www.configuroweb.com/wp-content/uploads/2023/03/Como-recorrer-un-Array-con-el-metodo-ForEach-en-Javascript.jpg',
//        text: 'La función foreach() tiene la función de iterar sobre una colección de elementos, como un array, una lista o cualquier otra estructura de datos iterable, y ejecutar un bloque de código para cada elemento de esa colección. Su propósito principal es simplificar el proceso de recorrer una colección de datos y realizar operaciones en cada uno de sus elementos, sin tener que preocuparse por la gestión de índices o el control del bucle manualmente. Al utilizar foreach(), el código se vuelve más legible y conciso, ya que la sintaxis está diseñada específicamente para este tipo de operaciones, lo que facilita la comprensión del código tanto para los desarrolladores como para quienes lo lean en el futuro.'
//    }
//
//    const post = new Post(postData)
//
//    postList.add(post)
//}

const posts = logic.getAllPosts()

posts.forEach(post => {
    const post2 = new Post(post)

    postList.add(post2)
})

const createPostForm = new CreatePostForm

createPostForm.onSubmit(event => {
    event.preventDefault()

    const title = createPostForm.getTitle()
    const image = createPostForm.getImage()
    const description = createPostForm.getDescription()

    try {
        logic.createPost(title, image, description)

    } catch (error) {
        if (error instanceof ContentError)
            createPostForm.setFeedback(error.message + ', por favor corrígelo')
        else
            createPostForm.setFeedback('Lo siento, hubo un error, inténtalo de nuevo más tarde.')
    }
})

main.add(createPostForm)

const footer = new Component('footer')
footer.addClass('Footer')
view.add(footer)

const addPostButton = new Button
addPostButton.setText('+')
footer.add(addPostButton)