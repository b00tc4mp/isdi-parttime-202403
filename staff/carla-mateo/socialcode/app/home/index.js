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

const postList = new Component('section')
postList.addClass('Section')
main.add(postList)

const article = new Component("article")
article.addClass("Article")
postList.add(article)

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

        location.reload()

        window.scrollTo(0, 0)

    } catch (error) {
        if (error instanceof ContentError)
            createPostForm.setFeedback(error.message + ', please, correct it')
        else
            createPostForm.setFeedback('❌ Sorry, there was an error, please try again later')
    }
})



const footer = new Component('footer')
footer.addClass('Footer')
view.add(footer)

const addPostButton = new Button
addPostButton.setText('+')

logic.statusButton()

footer.add(addPostButton)




