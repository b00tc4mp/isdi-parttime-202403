// if (!logic.isUserLoggedIn())
//     location.href = '../login'


const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')
view.add(header)

userLogic.getUserName((error, userName) => {
    if (error) {
        alert(error.message)

        return
    }

    usernameTitle.setText(userName)
})

const usernameTitle = new Heading(3)
header.add(usernameTitle)

const logoutButton = new Button('Logout')

logoutButton.onClick(() => {
    userLogic.logoutUser()
    location.href = '../login'
})

header.add(logoutButton)

const main = new Component('main')
view.add(main)

const postList = new PostList
main.add(postList)

const footer = new Component('footer')
footer.addClass('Footer')
view.add(footer)

const addPostButton = new Button
addPostButton.setText("+")
footer.add(addPostButton)

const scrollTop = new Component('i')
scrollTop.addClass('fa-solid')
scrollTop.addClass('fa-arrow-up-long')
footer.add(scrollTop)

scrollTop.onClick(() => {
    const scrollDuration = 2000
    const scrollStep = -window.scrollY / (scrollDuration / 15)
    const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep)
        } else {
            clearInterval(scrollInterval)
        }
    })
})

const divCreatePost = new Component('div')
divCreatePost.addClass('divCreatePost')

const createPostForm = new CreatePostForm()

addPostButton.onClick(() => {
    divCreatePost.add(createPostForm)
    view.add(divCreatePost)

    createPostForm.onPostCreated(() => {
        view.remove(divCreatePost)

        postList.load()
    })
})
