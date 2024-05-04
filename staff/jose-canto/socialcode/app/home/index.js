if (!logic.isUserLoggedIn()) {
  location.href = "../login";
}

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

// MAIN
const main = new Component("main")
main.addClass("Main")

// SECTION
const postList = new Component("section")
postList.addClass("Section")

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


// ADD AT HEADER
header.add(logo)
header.add(usernameTitle)
header.add(logoutButton)

// ADD AT VIEW (BODY)
view.add(header)
view.add(main)

// ADD AT MAIN
main.add(postList)


const posts = logic.getAllPosts()
logic.posts()
const createPostForm = new CreatePostForm()


createPostForm.onSubmit((event) => {
  event.preventDefault()

  const title = createPostForm.getTitle()
  const image = createPostForm.getImage()
  const description = createPostForm.getDescription()

  try {
    logic.createPost(title, image, description)

    //TODO refresh post list
    location.reload()

    window.scrollTo(0, 0)

  } catch (error) {
    if (error instanceof ContentError) {
      createPostForm.setFeedback(error.message + ", please correct it")
    } else {
      createPostForm.setFeedback("Sorry, there was an error, ples try again later")
    }
  }
})

const addPostButton = new Button()
addPostButton.setText("+")

logic.statusButton()

const footer = new Component("footer")
footer.addClass("Footer")
view.add(footer)
footer.add(addPostButton)
