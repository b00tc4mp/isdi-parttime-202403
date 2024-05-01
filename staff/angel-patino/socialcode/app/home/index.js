if (!logic.isUserLoggedIn())
    location.href = '../login'

    const view = new Component(document.body)
    view.addClass('View')

    const header = new Component('header')
    header.addClass('Header')

    const userName = logic.getUserName()

    const usernameTitle = new Heading(3)
    usernameTitle.setText(username)

    header.add(usernameTitle)

    const logoutButton = new Button
    logoutButton.setText('Logout')

    logoutButton.onClick(() => {
        logic.logoutUser()

        location.href='../login'
    })

    header.add(logoutButton)

    const footer = new Component('footer')
    footer.addClass('Footer')

    const addPostButton = new Button
    addPostButton.setText('')
    
    footer.add(addPostButton)

    view.add(header)
    view.add(footer)