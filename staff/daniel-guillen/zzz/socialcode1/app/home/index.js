if (!logic.isUserLoggedIn())
    location.href = '../login'


const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')
view.add(header)

const logo = new Component("div")
logo.setText("SOCIAL CODE")
logo.addClass("Logo")

header.add(logo)

const userName = logic.getUserName()

const usernameTitle = new Heading(3)
usernameTitle.setText(userName)
header.add(usernameTitle)

const logoutButton = new Button
logoutButton.setText('Logout 💤')

logoutButton.onClick(() => {
    logic.logoutUser()

    location.href = '../login'
})

header.add(logoutButton)

const main = new Component('main')
view.add(main)

const postList = new PostList
main.add(postList)

const createPostForm = new CreatePostForm

createPostForm.onPostSubmit((title, image, description) => {

    try {
        logic.createPost(title, image, description)

        createPostForm.clear()

        main.remove(createPostForm)

        postList.load()
    } catch (error) {
        if (error instanceof ContentError)
            createPostForm.setFeedback(error.message + ', please, correct it')
        else
            createPostForm.setFeedback('😵 sorry, please try again later')
    }
})

createPostForm.onCancelClick(event => {
    event.preventDefault()

    createPostForm.clear()

    main.remove(createPostForm)
})

const footer = new Component('footer')
footer.addClass('Footer')
view.add(footer)

const addPostButton = new Button
addPostButton.setText('New Post ➕')

addPostButton.onClick(() => main.add(createPostForm))

footer.add(addPostButton)