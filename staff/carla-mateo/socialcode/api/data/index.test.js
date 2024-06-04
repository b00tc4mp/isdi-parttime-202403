import data from './index.js'

// data.findUser(user => user.name === 'wendy', (error, user) => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log(user)

// })
data.insertUser({ name: 'James', surname: 'Hook', email: 'james@hook.com', password: '1234' }, error => {
    if (error) {
        console.error(error)

        return

    }

    console.log('user.inserted')
})