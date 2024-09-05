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

const logoutButton = new Button()
logoutButton.setText('Logout')

logoutButton.onClick(() => {
    logic.logoutUser()

    location.href = '../login'
})

header.add(logoutButton)

const main = new Component('main')
view.add(main)

const postList = new Component('section')
main.add(postList)

const posts = logic.getAllPosts()

posts.forEach(post => {

    const post2 = new Post(post)

    postList.add(post2)
})

const createPostForm = new CreatePostForm()

createPostForm.onSubmit(event => {
    event.preventDefault()

    const title = createPostForm.getTitle()
    const image = createPostForm.getImage()
    const description = createPostForm.getDescription()

    try {
        logic.createPost(title, image, description)

        createPostForm.clear()

        main.remove(createPostForm)

        postList.removeAll()

        const posts = logic.getAllPosts()

        posts.forEach(post => {

            const post2 = new Post(post)

            postList.add(post2)
        })

    } catch (error) {
        if (error instanceof ContentError)
            createPostForm.setFeedback(error.message + ', please correct it')

        else
            createPostForm.setFeedback('an unexpected error happened, try again later')
    }

})

createPostForm.onCancelClick(() => main.remove(createPostForm))

const footer = new Component('footer')
footer.addClass('Footer')
view.add(footer)

const addPostButton = new Button()
addPostButton.setText('+')

addPostButton.onClick(() => main.add(createPostForm))

/*addPostButton.onClick(() => {
    return main.add(createPostForm)
})*/

footer.add(addPostButton)

