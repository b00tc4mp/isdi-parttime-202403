if (!logic.isUserLoggedIn())// si no ha hecho login no te deje acceder al juego
    location.href = "../login"

const view = new Component(document.body)
view.addClass("View")

const header = new Component("header")
header.addClass("Header")

logic.getUsername((error, username) => {
    if (error) {
        alert(error.message)

        return
    }

    userNameTitle.setText(username)
})

const userNameTitle = new Heading(3)

header.add(userNameTitle)

//añadimos todo al header
view.add(header)


const logoutButton = new Button
logoutButton.setText("Logout")
logoutButton.addClass("logoutButton")

logoutButton.onClick(() => {
    logic.logoutUser()

    location.href = "../login"
})

header.add(logoutButton)

const main = new Component("main")
view.add(main)

const postList = new PostList
main.add(postList)


const createPostForm = new NewPostForm

/* createPostForm.onPostSubmit((title, image, description) => {

    try {
        logic.createPost(title, image, description)
        //limpiamos formularo
        createPostForm.clear()

        main.remove(createPostForm)
        //eliminamos el formulario de crearel post

        postList.load()
    } catch (error) {
        if (error instanceof ContentError)
            createPostForm.setFeedback(error.message + ", please, correct it")
        else
            createPostForm.setFeedback("sorry, there was an error, please try again later")
    }
}) */

/* createPostForm.onCancelClick(event => {
    event.preventDefault()
    main.remove(createPostForm)
}) */

//otorgamos mas responsabilidad al constructor mandandole la accion de  try catch
createPostForm.onPostCreated(() => {
    main.remove(createPostForm)
    postList.load()
})

//mecanizamos de igual forma el boton de cancelar
createPostForm.onCancelClick(() => main.remove(createPostForm))


const footer = new Component("footer")
footer.addClass("Footer")
view.add(footer)

const addPostButton = new Button
addPostButton.setText("+")

addPostButton.addClass("PostButton")
// mecanizamos qu el formularo aparezca al clicar el boton
addPostButton.onClick(() => main.add(createPostForm))

footer.add(addPostButton)





