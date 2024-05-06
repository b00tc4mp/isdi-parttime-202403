// if(!logic.isUserLoggedIn())
//     location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')

const userName = logic.getUsername()

const usernameTitle = new Heading(3)
usernameTitle.setText(userName)

const logoutButton = new Button
logoutButton.setText('Logout')

logoutButton.onClick( () => { 
    logic.logoutUser()

    location.href = '../login'
})

const main = new Component('main')

const postList = new Component('section')

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


    }catch (error){
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

header.add(logoutButton)
header.add(usernameTitle)

footer.add(addPostButton)

view.add(header)

view.add(main)
view.add(footer)




// {
//     const postData = {
//         author: 'Iñaki Barrera',
//         title: 'How to console.log',
//         image: 'https://miro.medium.com/v2/resize:fit:1400/0*p4qK_4rSh9jpoGqt.png',
//         text: 'console. log : imprime el texto en la consola como un mensaje de registro.'
//     }

//     const post = new Post(postData)

//     postList.add(post)
// }

// {
//     const postData = {
//         author: 'Ismael Garrido',
//         title: 'How use the Error in js',
//         image: 'https://miro.medium.com/v2/resize:fit:1400/1*NyTCYBdQZsKpR2TUEN_FIw.png',
//         text: 'Mediante el try catch podemos recoger el error'
//     }
