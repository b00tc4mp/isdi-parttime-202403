import data from './index.js'

// data.findUser(user => user.surname === 'Batman', (error, user) => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log(user)
// })

// data.insertUser({ name: 'Bruno', surname: 'Waine', email: 'waine@corp.com', username: 'Batman', password: '123' }, error => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log('user inserted')
// })

// data.findPosts(post => post.date.includes('?'), (error, posts) => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log(posts)
// })

// data.insertPost({
//     author: "Dani88",
//     title: "Hola",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS925juhQijXn9GM3XP_Ptcg_afPoMwWmWMog&s", description: "mundo",
//     date: new Date().toISOString()
// }, error => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log('post inserted')
// })

data.deletePost(post => post.title === 'Hola', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post deleted')
})