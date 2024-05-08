if (!logic.isUserLoggedIn()) {
  location.href = "../login";
}

//BODY
const view = new Component(document.body)
view.addClass('View')

//LOGO
const logo = new Component("div")
logo.setText("SOCIAL CODE")
logo.addClass("Logo")

// HEADER
const header = new Component("header")
header.addClass("Header")

// MAIN
const main = new Component("main")
main.addClass("Main")

// SECTION
const postList = new PostList()
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

// FOOTER
const footer = new Component("footer")
footer.addClass("Footer")


// ADD AT HEADER
header.add(logo)
header.add(usernameTitle)
header.add(logoutButton)

// ADD AT VIEW (BODY)
view.add(header)
view.add(main)

// ADD AT MAIN
main.add(postList)


utils.getDateStringDayMonthYearFormat()

const createPostForm = new CreatePostForm()

createPostForm.onSubmit((event) => {
  event.preventDefault()

  const title = createPostForm.getTitle()
  const image = createPostForm.getImage()
  const description = createPostForm.getDescription()


  try {
    logic.createPost(title, image, description)

    createPostForm.clear()

    main.remove(createPostForm)

    postList.removeAll()

    postList.load()



    window.scrollTo(0, 0)
    statusButton = !statusButton

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

let statusButton = true
addPostButton.onClick(event => {
  event.preventDefault()

  statusButton = !statusButton
  if (!statusButton) {
    main.add(createPostForm)

  } else if (statusButton)
    main.remove(createPostForm)
})

createPostForm.onCancelButton(() => {
  main.remove(createPostForm)

  statusButton = !statusButton
})


const scrollTop = new Component("i")
scrollTop.addClass("fa-solid")
scrollTop.addClass("fa-arrow-up-long")

scrollTop.onClick(() => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
})


// ADD FOOTER
view.add(footer)
footer.add(addPostButton)
footer.add(scrollTop)

