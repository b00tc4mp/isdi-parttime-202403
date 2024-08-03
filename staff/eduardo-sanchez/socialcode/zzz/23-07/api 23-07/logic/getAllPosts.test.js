import 'dotenv/config'
import mongoose from 'mongoose'

import getAllPosts from './getAllPosts.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllPosts('669935314ede473ff6cdfd8a')
                .then(posts => console.log('posts retrieved', posts))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

/*
.then(() => {
   try {
       getAllPosts('669935314ede473ff6cdfd8a')
           .then(posts => console.log((posts.filter((post) => post.id === '669937627831a5111aca71f0'))[0])
            .catch(error => console.error(error))
           )
   } catch (error) {
       console.error(error)
   }
})
.catch(error => console.error(error))
*/