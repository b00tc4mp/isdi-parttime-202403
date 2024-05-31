if (!logic.isUserLoggedIn()) {
  location.href = '../login'
}

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')
view.add(header)


logic.getUserName((error, userName) => {
  if (error) {
    alert(error.message)

    return
  }

  usernameTitle.setText(userName)
})

const usernameTitle = new Heading(3)
header.add(usernameTitle)

const logoutButton = new Button()
logoutButton.setText('Logout')
header.add(logoutButton)

logoutButton.onClick(() => {
  logic.logoutUser()
  location.href = '../login'
})

const main = new Component('main')
view.add(main)
const postList = new PostList()
main.add(postList)

const createPostForm = new CreatePostForm()

createPostForm.onPostCreated(() => {
  main.remove(createPostForm)

  postList.load()
})

createPostForm.onCancelClick(() => {
  main.remove(createPostForm)
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
