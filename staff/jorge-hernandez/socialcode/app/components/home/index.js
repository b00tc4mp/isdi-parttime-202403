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
usernameTitle.setText(userName)
header.add(usernameTitle)

const logoutButton = new Button()
logoutButton.setText('Logout')
header.add(logoutButton)

logoutButton.onClick(() => {
  logic.logoutUser()
  location.href = '../login'
})

const post = new Component('article')
post.addClass('Post')
view.add(post)

const authorTitle = new Component('p')
authorTitle.setText('magicjorge')

const postTitle = new Component('h2')
postTitle.setText('How to console.log')

const postImage = new Image()
postImage.setUrl(
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmZwZXZ6azI5eGIyZXp5aGxnbGJ2M2JiZHlsbW92MHNvZzJxbG9sMCZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/xdPsnCzk10u23jQIXM/giphy.gif'
)

const postText = new Component('p')
postText.setText('Loren Ipsum asdf asfdsafasf asfasfasf asfasfsaf')

post.add(authorTitle)
post.add(postTitle)
post.add(postImage)
post.add(postText)

const footer = new Component('footer')
footer.addClass('Footer')
view.add(footer)

const addPostButton = new Component('button')
addPostButton.setText('+')
footer.add(addPostButton)
