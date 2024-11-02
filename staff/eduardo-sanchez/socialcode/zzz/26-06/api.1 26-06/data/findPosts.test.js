import data from "./index.js"

data.findPosts(post => post.date.includes('T15'), (error, postsFound) => {
    if (error) {
        console.error(error)

        return
    }

    if (!postsFound || postsFound.length === 0) {
        console.error("Posts or Post not found")
  } else {
        console.log('Posts or Post with search details found')
  }

    console.log(postsFound)
})

//data.findPosts(post => post.title && post.title.includes("L"), (error, posts) => {

// data.findPosts(post => post.date.includes('T1Z'), (error, posts) => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log(posts)
// })
