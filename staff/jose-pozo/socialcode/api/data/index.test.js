import data from './index.js'

data.findUser(user => user.username === 'Jon', (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(user)
})