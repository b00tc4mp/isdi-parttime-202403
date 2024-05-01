if(!logic.isUserLoggedIn()){
    location.href = '../login'
}

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('header')

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

header.add(usernameTitle)
header.add(logoutButton)

const post = new Component('article')
const postTitle = new Heading(2)
postTitle.setText('How to console.log')
const authorTitle = new Heading(3)
authorTitle.setText(userName)
const postImage = new Image
postImage.setUrl('https://www.udacity.com/blog/wp-content/uploads/2020/11/Hello-World_Blog-scaled.jpeg')
const postText = new Component('p')
postText.setText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor neque vitae tempus quam pellentesque nec nam aliquam. Ultrices gravida dictum fusce ut placerat.')

post.add(authorTitle)
post.add(postTitle)
post.add(postImage)
post.add(postText)





const footer = new Component('footer')
footer.addClass('footer')

const addPostButton = new Button
addPostButton.addClass("fa-solid")
addPostButton.addClass("fa-plus")

footer.add(addPostButton)


view.add(header)
view.add(post)
view.add(footer)
