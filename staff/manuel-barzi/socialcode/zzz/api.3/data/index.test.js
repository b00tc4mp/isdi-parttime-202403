import data from './index.js'

// data.findUser(user => user.surname === 'Grillo', (error, user) => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log(user)
// })

data.insertUser({ name: 'James', surname: 'Hook', email: 'james@hook.com', username: 'jameshook', password: '123123123' }, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user inserted')
})