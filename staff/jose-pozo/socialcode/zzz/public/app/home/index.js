if (!logic.isUserLoggedIn())
    location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')
view.add(header)

const logo = new Image
logo.setUrl('../assets/SocialCode.png')
logo.addClass('Logo')

header.add(logo)

const userName = logic.getUserName()

const usernameTitle = new Heading(3)
usernameTitle.setText(userName)
usernameTitle.addClass('UsernameTitle')
header.add(usernameTitle)

const logoutButton = new Button
logoutButton.setText('Logout')
logoutButton.addClass('LogoutButton')

logoutButton.onClick(() => {
    logic.logoutUser()

    location.href = '../login'
})

header.add(logoutButton)

const main = new Component('main')
main.addClass('Main')
view.add(main)

const postList = new Component('section')
postList.addClass('PostList')
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

        // TODO dismount create post form from main
        // TODO refresh post list
        location.reload()

        window.scrollTo(0, 0)

    } catch (error) {
        if (error instanceof ContentError)
            createPostForm.setFeedback(error.message + ', please, correct it')
        else
            createPostForm.setFeedback('sorry, thre was an error, please tr again later')
    }
})

//TODO mount creat post form when clicing on plus button

const footer = new Component('footer')
footer.addClass('Footer')
view.add(footer)

const homeButton = new Button
//homeButton.setText('+')
homeButton.addClass('HomeButton')
//homeButton.setUrl('../assets/home.png')

const addPostButton = new Button
addPostButton.setText('+')
addPostButton.addClass('PostButton')

footer.add(homeButton)
footer.add(addPostButton)

const statusButton = logic.statusButton()

