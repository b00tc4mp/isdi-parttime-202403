// if (!logic.isUserLoggedIn())
//     location.href = '../login'

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
view.add(main)

const postList = new Component('section')
main.add(postList)

const posts = logic.getAllPosts()

posts.forEach(post => {
    const newPost = new Post(post)

    postList.add(newPost)
})





// const createPostForm = new CreatePostForm()

// createPostForm.onSubmit(event => {
//     event.preventDefault()

//     const title = createPostForm.getTitle()
//     const image = createPostForm.getImage()
//     const description = createPostForm.getDescription()

//     try {
//         logic.createPost(title, image, description)

//         createPostForm.clear()

//         location.reload()

//     } catch (error) {
//         if (error instanceof ContentError)
//             createPostForm.setFeedback('error.mesasge' + ', please, correct it')
//         else
//             createPostForm.setFeedback('Sorry, there was an error, try later again')
//     }
// })

// main.add(createPostForm)

const footer = new Component('footer')
footer.addClass('Footer')
view.add(footer)

const addPostButton = new Button
addPostButton.setText("+")
footer.add(addPostButton)

const divCreatePost = new Component('dialog')

addPostButton.onClick(() => {
    divCreatePost.addClass('diveCreatePost')

    const createPostForm = new CreatePostForm()

    createPostForm.onSubmit(event => {
        event.preventDefault()

        const title = createPostForm.getTitle()
        const image = createPostForm.getImage()
        const description = createPostForm.getDescription()

        try {
            logic.createPost(title, image, description)

            createPostForm.clear()

            location.reload()

        } catch (error) {
            if (error instanceof ContentError)
                createPostForm.setFeedback('error.mesasge' + ', please, correct it')
            else
                createPostForm.setFeedback('Sorry, there was an error, try later again')
        }
    })
    divCreatePost.add(createPostForm)
})

view.add(divCreatePost)


// [{
//     "author": "pepitogrillo",
//         "title": "How to console.log",
//         "image": "https://res.cloudinary.com/practicaldev/image/fetch/s--gJWXQzd2--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://cdn-images-1.medium.com/max/800/1%2AqmBE-ip-IkMnQuz3ZnaXHg.jpeg",
//         "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}]
