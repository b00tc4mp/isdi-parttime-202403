import data from './index.js'

data.findUser(user => user.surname === 'Doncic', (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(user)
})