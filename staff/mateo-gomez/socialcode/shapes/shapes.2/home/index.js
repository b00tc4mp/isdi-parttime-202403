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
const postList = new Component('section')


view.add(main)

main.add(postList)


const posts = logic.getAllPosts()

posts.forEach(post => {
    const post2 = new Post(post)

    postList.add(post2)

});
const createPostForm = new CreatePostForm

createPostForm.onSubmit(event => {
    event.preventDefault()

    const title = createPostForm.getTitle()
    const image = createPostForm.getImage()
    const description = createPostForm.getDescription()

    try {
        logic.createPost(title, image, description)
        //TODO dismount create post form from main
        //TODO refresh post list

    } catch (error) {
        if (error instanceof ContenetError)
            createPostForm.setFeedback(error.message + ', please, correct it')
        else
            createPostForm.setFeedFeedback('sorry, there was an error, please try again later')
    }
})

//TODO mount create form when clicking on plus button

main.add(createPostForm)

const footer = new Component('footer')
footer.addClass('Footer')

view.add(footer)

const addPostButtom = new Button
addPostButtom.setText('+')

footer.add(addPostButtom)




