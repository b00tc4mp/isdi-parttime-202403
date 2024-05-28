if (!logic.isUserLoggedIn())
    location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')

const userName = logic.getUserName()

const usernameTitle = new Heading(3)
usernameTitle.setText(userName)

header.add(usernameTitle)

const logoutButton = new Button()
logoutButton.setText('Logout')

logoutButton.onClick(() => {
    logic.logoutUser()

    location.href = '../login'
})

header.add(logoutButton)

const post = new Component('article')

const authorTitle = new Component('p')
authorTitle.setText('Author')

const postTitle = new Component('h2')
postTitle.setText('How to console.log')

const postImage = new Image()
postImage.setUrl('https://www.newker.com/wp-content/uploads/2021/04/Trail-Grey-225x90-es-zktrXaIQYURGP9gp.jpg')

const postText = new Component('p')
postText.setText('En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.')

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