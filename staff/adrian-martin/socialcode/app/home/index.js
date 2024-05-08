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
appTitle.setText('SocialCode')
appTitle.addClass('SocialCode')

const logoutButton = new Button
logoutButton.setText('Logout')

logoutButton.onClick( () => { 
    logic.logoutUser()

    location.href = '../login'
})

const main = new Component('main')

const postList = new PostList()
main.add(postList)

const createPostForm = new CreatePostForm

createPostForm.onPostSubmit((title, image, description) => {
    try{
        logic.createPost(title, image, description)

        createPostForm.clear()

        main.remove(createPostForm)

        postList.load()
    }catch (error){
        if (error instanceof ContentError) 
            createPostForm.setFeedback(error.message + '. please, repeat it')

        else
            createPostForm.setFeedback('sorry, there was an error, please try again later')
    }
})

createPostForm.onCancelClick(event => {
    event.preventDefault()
    
    main.remove(createPostForm)
})

const footer = new Component('footer')
footer.addClass('Footer')

const addPostButton = new Button
addPostButton.setText('+')

addPostButton.onClick(() => main.add(createPostForm))

header.add(appTitle)
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
