import data from "./index.js";

data.findUser(user => user.surname === 'Grillo', (error, user) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(user)
})

// data.insertUser({ name: 'Jorge', surname: 'Moreno', email: 'test@gmail.com', username: 'Jorgem', password: '123123' }, error => {
//     if (error) {
//         console.error(error)

//         return
//     }
//     console.log('User inserted')
// })

// data.findPosts(post => post.date.includes('T19'), (error, posts) => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log(posts)
// })