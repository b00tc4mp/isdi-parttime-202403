// if(!logic.isUserLoggedIn())
//     location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const header = new Component('header')
header.addClass('Header')

const userName = logic.getUsername()

const usernameTitle = new Heading(3)
usernameTitle.setText(userName)

const logoutButton = new Button
logoutButton.setText('Logout')

logoutButton.onClick( () => { 
    logic.logoutUser()

    location.href = '../login'
})

const post = new Component('article')

const authorTitle = new Component
authorTitle.setText('Iñaki Barrera')

const postTitle = new Component('h2')
postTitle.setText('How to console.log')

const postImage = new Image
postImage.setUrl('https://miro.medium.com/v2/resize:fit:1400/0*p4qK_4rSh9jpoGqt.png')

const postText = new Component('p')
postText.setText('console. log : imprime el texto en la consola como un mensaje de registro.')

post.add(authorTitle)
post.add(postTitle)
post.add(postImage)
post.add(postText)

const footer = new Component('footer')
footer.addClass('Footer')

const addPostButton = new Button
addPostButton.setText('+')

header.add(logoutButton)
header.add(usernameTitle)

footer.add(addPostButton)

view.add(header)
view.add(post)
view.add(footer)
