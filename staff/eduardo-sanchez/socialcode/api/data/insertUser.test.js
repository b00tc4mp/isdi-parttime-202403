import data from "./index.js"

data.insertUser({ name: 'James', surname: 'Hook', email: 'james@hook.com', username: 'jameshook', password: '123123123' }, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user inserted')
})