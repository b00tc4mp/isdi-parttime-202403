if (!logic.isUserLoggedIn())
    location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')

view.add(header)

logic.getUserName((error, userName) => {
    if (error) {
        alert(error.message)

        return
    }

    usernameTitle.setText(userName)
})

const usernameTitle = new Heading(3)
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

const postList = new PostList('section')
main.add(postList)

const createPostForm = new CreatePostForm()

createPostForm.onPostCreated(() => {
    main.remove(createPostForm)

    postList.load()
})

createPostForm.onCancelClick(() => main.remove(createPostForm))

const footer = new Component('footer')
footer.addClass('Footer')

view.add(footer)

const addPostButton = new Button()
addPostButton.setText('+')

addPostButton.onClick(() => main.add(createPostForm))

footer.add(addPostButton)

