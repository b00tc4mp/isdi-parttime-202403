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
