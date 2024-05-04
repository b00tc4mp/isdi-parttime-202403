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
authorTitle.setText('Amanda Loriente')

const postTitle = new Component('h2')
postTitle.setText('Relajandome en la playita')

const postImage = new Image
postImage.setUrl('https://static.vecteezy.com/system/resources/previews/009/347/940/non_2x/silhouette-of-young-woman-on-the-beach-latin-american-woman-sitting-on-the-beach-sand-looking-at-the-sky-on-a-beautiful-summer-day-photo.jpg')

const postText = new Component('p')
postText.setText('Busco chico guapo, que le guste viajar, y quiera tener 3 niños jijiji')

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

