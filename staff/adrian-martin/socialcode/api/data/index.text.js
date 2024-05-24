import data from "./index.js";

// data.findUser(user=> user.surname === 'Martin', (error, user) => {
//     if(error){
//         console.error(error)

//         return
//     }
//     console.log(user)
// })


// data.insertUser({name: 'James', surname: 'Hook', email: 'james@hook.com', password: '123123123'}, error => {
//     if(error) {
//         console.error(error)

//         return
//     }

//     console.log('user inserted')
// })


// data.findPosts(post => post.data.includes('T18'), (error, posts) => {
//     if(error){
//         console.error(error)

//         return
//     }
//     console.log(posts)
// })


// data.insertUser({
//     author: 'AdrianGon',
//     title: 'JavaScript',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB0_ijMX_4xf0rGse2D334wtm-LcqQ_lrsFQ&s',
//     description: 'Viva JavaScript', 'date': '2024-05-23T20:56:53.510Z',
//     id: '8412537376979783-1716497813511'
// }, error => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log('user inserted')
// })


data.deletePost(post => post.title === 'smile 2', error => {
    if(error){
        console.error(error)

        return
    }
    console.log('post delete')
})