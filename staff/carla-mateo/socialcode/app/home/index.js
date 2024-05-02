// if (!logic.isUserLoggedIn())
//     location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')

const userName = logic.getUserName()

const usernameTitle = new Heading(3)
usernameTitle.setText(userName)

header.add(usernameTitle)

const logoutButton = new Button
logoutButton.setText('Logout')

logoutButton.onClick(() => {
    logic.logoutUser()

    location.href = '../login'
})

header.add(logoutButton)

const post = new Component('article')

const authorTitle = new Component('p')
authorTitle.setText('Wendolin')

const postTitle = new Component('h2')
postTitle.setText('How to console.log')

const postImage = new Image
postImage.setUrl('https://res.cloudinary.com/practicaldev/image/fetch/s--gJWXQzd2--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://cdn-images-1.medium.com/max/800/1%2AqmBE-ip-IkMnQuz3ZnaXHg.jpeg')

const postText = new Component('p')
postText.setText('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.')

post.add(authorTitle)
post.add(postTitle)
post.add(postImage)
post.add(postText)

view.add(post)

const footer = new Component('footer')
footer.addClass('Footer')

const addPostButton = new Button
addPostButton.setText('+')

footer.add(addPostButton)

view.add(header)
view.add(footer)


