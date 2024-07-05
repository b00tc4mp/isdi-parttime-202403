import mongoose from "mongoose"
import { User, Post } from './index.js'

mongoose.connect('mongodb://localhost:27017')
    .then(() => {
        // User.create({ name: 'Noco', surname: 'lasito', email: 'nico@blasito.com', username: 'nicolasito', password: '1234' })
        //     .then(() => console.log('created'))
        //     .catch(error => console.error(error))

        // Post.create({ author: 'Nicolasito', image: 'https://media2.giphy.com/media/ciqS8U27hugHAaUEST/giphy.webp?cid=790b76115soc2friat8l0w6u8f001xyt4ky0ocj38g8jfrv0&ep=v1_gifs_search&rid=giphy.webp&ct=g', description: 'Mew' })
        //     .then(() => console.log('created'))
        //     .catch(error => console.error(error))

        Post.find({}).populate('author', 'username')
            .then(posts => console.log('retrieved', posts))
            .catch(error => console.error(error))

    })
    .catch(error => console.error(error))