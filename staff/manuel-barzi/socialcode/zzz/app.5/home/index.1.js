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

const logoutButton = new Button
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
        author: 'pepitogrillo',
        title: 'How to console.log',
        image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--gJWXQzd2--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://cdn-images-1.medium.com/max/800/1%2AqmBE-ip-IkMnQuz3ZnaXHg.jpeg',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    }

    const post = new Post(postData)

    postList.add(post)
}

{
    const postData = {
        author: 'pepitogrillo',
        title: 'How to console.log',
        image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--gJWXQzd2--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://cdn-images-1.medium.com/max/800/1%2AqmBE-ip-IkMnQuz3ZnaXHg.jpeg',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
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