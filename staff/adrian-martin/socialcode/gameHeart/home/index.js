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
authorTitle.setText('Pepito Grillo')

const postTitle = new Component('h2')
postTitle.setText('How to console.log')

const postImage = new Image
postImage.setUrl('https://miro.medium.com/v2/resize:fit:1400/0*p4qK_4rSh9jpoGqt.png')

const postText = new Component('p')
postText.setText('Lorem Ipsum és un text de farciment usat per la indústria de la tipografia i la impremta. Lorem Ipsum ha estat el text estàndard de la indústria des de l\'any 1500, quan un impressor desconegut va fer servir una galerada de text i la va mesclar per crear un llibre de mostres tipogràfiques. No només ha sobreviscut cinc segles, sinó que ha fet el salt cap a la creació de tipus de lletra electrònics, romanent essencialment sense canvis. Es va popularitzar l\'any 1960 amb el llançament de fulls Letraset que contenien passatges de Lorem Ipsum, i més recentment amb programari d\'autoedició com Aldus Pagemaker que inclou versions de Lorem Ipsum.')

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

