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
logoutButton.setText('Logout')

logoutButton.onClick(() => {
    logic.logoutUser()

    location.href = '../login'
})

header.add(logoutButton)

const main = new Component('main')
main.addClass('Main')
view.add(main)

const postList = new PostList
postList.addClass('Section')
main.add(postList)

utils.getStringInDateFormat()

const createPostForm = new CreatePostForm

createPostForm.onPostSubmit((title, image, description) => {
    try {
        logic.createPost(title, image, description)

        createPostForm.clear()

        main.remove(createPostForm)

        postList.load()

        window.scrollTo(0, 0)

    } catch (error) {
        if (error instanceof ContentError)
            createPostForm.setFeedback(error.message + ', please, correct it')
        else
            createPostForm.setFeedback('❌ Sorry, there was an error, please try again later')
    }
})

createPostForm.onCancelClick(event => {
    event.preventDefault()

    main.remove(createPostForm)
})



const footer = new Component('footer')
footer.addClass('Footer')
view.add(footer)

const addPostButton = new Button
addPostButton.setText('+')

addPostButton.onClick(() => main.add(createPostForm))

footer.add(addPostButton)




