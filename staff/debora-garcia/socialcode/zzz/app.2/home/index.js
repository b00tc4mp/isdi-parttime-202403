if (!logic.isUserLoggedIn())// si no ha hecho login no te deje acceder al juego
    location.href = "../login"

const view = new Component(document.body)
view.addClass("View")

const header = new Component("header")
header.addClass("Header")

const userName = logic.getUserName()

const userNameTitle = new Heading(3)
userNameTitle.setText(userName)

header.add(userNameTitle)

//añadimos todo al header
view.add(header)


const logoutButton = new Button
logoutButton.setText("Logout")
logoutButton.addClass("logoutButton")

logoutButton.onClick(() => {
    logic.logoutUser()

    location.href = "../login"
})

header.add(logoutButton)

const main = new Component("main")
view.add(main)
const postList = new Component("section")
main.add(postList)

{
    const post = new Component("article")

    const authorTitle = new Component("p")
    authorTitle.setText("Roto Jaz")

    const postTitle = new Component("h2")
    postTitle.setText("Adopt me")

    const postImage = new Image
    postImage.setUrl("https://img.freepik.com/premium-vector/kawaii-cute-vector-koala-cartoon-style-drawing-illustration_945253-50.jpg?w=360")

    const postText = new Component("p")
    postText.setText("lorem5")


    post.add(authorTitle)
    post.add(postTitle)
    post.add(postImage)
    post.add(postText)
    postList.add(post)
}

{
    const post = new Component("article")

    const authorTitle = new Component("p")
    authorTitle.setText("Shelly Beach")

    const postTitle = new Component("h2")
    postTitle.setText("Adopt me")

    const postImage = new Image
    postImage.setUrl("https://img.freepik.com/premium-vector/kawaii-cute-vector-koala-cartoon-style-drawing-illustration_945253-50.jpg?w=360")

    const postText = new Component("p")
    postText.setText("lorem5")


    post.add(authorTitle)
    post.add(postTitle)
    post.add(postImage)
    post.add(postText)
    postList.add(post)
}
const footer = new Component("footer")
footer.addClass("Footer")

const addPostButton = new Button
addPostButton.setText("+")
addPostButton.addClass("PostButton")



footer.add(addPostButton)
view.add(footer)



