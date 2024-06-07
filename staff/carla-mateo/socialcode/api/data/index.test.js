import data from './index.js'

// data.findUser(user => user.name === 'wendy', (error, user) => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log(user)

// })
// data.insertUser({ name: 'James', surname: 'Hook', email: 'james@hook.com', password: '1234' }, error => {
//     if (error) {
//         console.error(error)

//         return

//     }

//     console.log('user inserted')
// })
// data.findPosts(post => post.date.includes('T0'), (error, posts) => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log(posts)
// })

// data.insertPost({
//     author: 'jameshook',
//     title: 'smile 2',
//     image: 'https://m.media-amazon.com/images/I/41xsPjrM-pL._AC_UF350,350_QL50_.jpg',
//     description: 'hi 2',
//     date: new Date().toISOString()
// }, error => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log('post inserted')
// })

data.deletePost(post => post.title === 'smile 2', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('delete post')
})