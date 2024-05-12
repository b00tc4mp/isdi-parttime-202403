if (!logic.isUserLoggedIn()) {
    location.href = '../login'
}

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('header')

const title = new Heading(2)
title.addClass('title')
title.setText('SocialCode')

const userName = logic.getUserName()

const usernameTitle = new Heading(3)
usernameTitle.setText(userName)



const logoutButton = new Button
logoutButton.addClass("fa-solid")
logoutButton.addClass("fa-arrow-right-from-bracket")

logoutButton.onClick(() => {
    logic.logOutUser()

    location.href = '../login'
})


header.add(title)
header.add(usernameTitle)
header.add(logoutButton)




const main = new Component('main')
main.addClass('main')

const postList = new Component('section')
main.add(postList)

const posts = logic.getAllPosts()

posts.forEach(post => {
    const post2 = new Post(post)
    postList.add(post2)
});

const createPostForm = new CreatePostForm

createPostForm.onPostCreated(() => {
    main.remove(createPostForm)
  
  postList.load()
})

const footer = new Component('footer')
footer.addClass('footer')

const addPostButton = new Button
addPostButton.addClass("fa-solid")
addPostButton.addClass("fa-plus")

footer.add(addPostButton)

addPostButton.onClick(()=>{main.add(createPostForm)
})

createPostForm.onSubmit((event) =>{
    event.preventDefault()

    

    const title = createPostForm.getTitle()
    const image = createPostForm.getImage()
    const description = createPostForm.getDescription()
    
    try {
        logic.createPost(title, image, description)
        main.remove(createPostForm)
        

    } catch (error) {
        if(error instanceof ContentError){
            createPostForm.setFeedback(error.message + ', Please, Correct it')
        }else{
            createPostForm.setFeedback('Sorry, there was an error, please try again later')
        }
    }
    
})

createPostForm.onCancelClick(() => main.remove(createPostForm))


view.add(header)
view.add(main)
view.add(footer)



