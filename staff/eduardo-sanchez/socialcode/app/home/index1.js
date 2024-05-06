if (!logic.isUserLoggedIn())
    location.href = '../login'

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

logoutButton.onClick(() => {
    logic.logoutUser()

    location.href = '../login'
})

header.add(logoutButton)

const main = new Component('main')

view.add(main)

const postList = new Component('section')

main.add(postList)

{
    const postData = {
        author: 'Author',
        title: 'How to console.log',
        image: 'https://www.newker.com/wp-content/uploads/2021/04/Trail-Grey-225x90-es-zktrXaIQYURGP9gp.jpg',
        text: 'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.'

    }

    const post = new Post(postData)

    postList.add(post)

}

{
    const postData = {
        author: 'Author',
        title: 'How to console.log',
        image: 'https://www.newker.com/wp-content/uploads/2021/04/Trail-Grey-225x90-es-zktrXaIQYURGP9gp.jpg',
        text: 'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.'

    }

    const post = new Post(postData)

    postList.add(post)

}

const footer = new Component('footer')
footer.addClass('Footer')
view.add(footer)

const addPostButton = new Button
addPostButton.setText('+')

footer.add(addPostButton)

