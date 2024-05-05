if (!sessionStorage.username) {
  location.href = '../login'
}

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')
view.add(header)

const userName = logic.getUserName()

const usernameTitle = new Heading(3)
usernameTitle.setText('Hola ' + userName)
header.add(usernameTitle)

const logoutButton = new Button()
logoutButton.setText('Logout')
header.add(logoutButton)

const main = new Component('main')
view.add(main)
const postList = new Component('section')
main.add(postList)

logoutButton.onClick(() => {
  logic.logoutUser()
  location.href = '../login'
})

const posts = logic.getAllPosts()
// const posts = JSON.parse(localStorage.posts)
if (localStorage.posts) {
  posts.forEach((post) => {
    const post2 = new Post(post)
    postList.add(post2)
  })
}

const createPostForm = new CreatePostForm()

createPostForm.onSubmit((event) => {
  event.preventDefault()
  const title = createPostForm.getTitle()
  const image = createPostForm.getImage()
  const description = createPostForm.getDescription()
  try {
    logic.createPost(title, image, description)
    main.remove(createPostForm)

    location.reload()
  } catch (error) {
    if (error instanceof ContentError) {
      createPostForm.setFeedback(error.message + ' corrígelo')
    } else {
      createPostForm.setFeedback('Hay un error, en breve lo solucionaremos')
    }
  }
})

const footer = new Component('footer')
footer.addClass('Footer')
view.add(footer)

const addPostButton = new Component('button')
addPostButton.setText('+')
addPostButton.addClass('Button')
addPostButton.onClick(() => {
  main.add(createPostForm)
  const create = document.querySelector('.CreatePostForm')
  create.scrollIntoView()
})
footer.add(addPostButton)
