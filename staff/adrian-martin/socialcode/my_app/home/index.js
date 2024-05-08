// if(!logic.isUserLoggedIn())
//     location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')

const userName = logic.getUsername()

const usernameTitle = new Heading(3)
usernameTitle.setText(userName)

const appTitle = new Heading(3)
appTitle.setText('BurningGate')
appTitle.addClass('BurningGate')

const logoutButton = new Button
logoutButton.setText('Logout')

logoutButton.onClick( () => { 
    logic.logoutUser()

    location.href = '../login'
})

const main = new Component('main')

view.add(main)

const postList =  new Component('section')

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

    try{
        logic.createPost(title, image, description)

    } catch (error) {
        if (error instanceof ContentError) 
            createPostForm.setFeedback(error.message + '. please, repeat it')
        else
            createPostForm.setFeedback('sorry, there was an error, please try again later')
    }
})

main.add(createPostForm)

const footer = new Component('footer')
footer.addClass('Footer')

const addPostButton = new Button
addPostButton.setText('+')
footer.add(addPostButton)

header.add(appTitle)
header.add(logoutButton)
header.add(usernameTitle)

view.add(header)
view.add(footer)

