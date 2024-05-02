
//BODY
const view = new Component(document.body)
view.addClass('View')

//LOGO
const logo = new Image()
logo.setImage("../img/logo.jpg")
logo.addClass("Logo")

// HEADER
const header = new Component("header")
header.addClass("Header")


// USER
const name = logic.getName()

const usernameTitle = new Header(3)
usernameTitle.setText(name)

// LOGOUT BUTTON
const logoutButton = new Button
logoutButton.setText('Logout')

logoutButton.onClick(() => {
  logic.logoutUser()

  location.href = '../login'
})


// POST
const post = new Component("article")
post.addClass("Article")

const postTitle = new Component("h2")
postTitle.setText("Console.log")
postTitle.addClass("PostTitle")

const postText = new Component("p")
postText.addClass("PostText")
postText.setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit justo et odio venenatis, ut commodo sem scelerisque. Pellentesque id mi ac tortor congue congue nec eget ipsum. Sed et justo dolor. Vivamus nec blandit velit. Integer facilisis, metus eget congue tincidunt, ligula lectus mattis dui, et rutrum nunc ipsum sit amet urna. Nullam id nibh non enim consequat suscipit at eu lacus. Morbi malesuada aliquet ex, nec hendrerit libero lacinia at. Sed eleifend nunc et ipsum rutrum, ac cursus lorem fringilla. ")

const authorTitle = new Component("p")

const userName = logic.getUserName()
authorTitle.setText(userName)
authorTitle.addClass("AuthorTitle")

const postImage = new Image()
postImage.setImage("../img/code.png")
postImage.addClass("Image")



const divImage = new Component("div")
divImage.addClass("DivImage")


// FOOTER
const footer = new Component("footer")
footer.addClass("Footer")


//FOOTER BUTTON
const addPostButton = new Button()
addPostButton.setText("+")


// ADD AT HEADER
header.add(logo)
header.add(usernameTitle)
header.add(logoutButton)


// ADD AT VIEW (BODY)
view.add(header)
view.add(post)

// ADD AT POST
post.add(authorTitle)
post.add(postTitle)
post.add(postText)
post.add(divImage)

// ADD AT DIV IMAGE
divImage.add(postImage)

view.add(footer)

//ADD AT FOOTER
footer.add(addPostButton)
