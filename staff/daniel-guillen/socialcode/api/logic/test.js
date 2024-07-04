    import 'dotenv/config'
    import mongoose from 'mongoose'
    
    import createPost from './createPost.js'
    
    const { MONGODB_URL } = process.env
    
    mongoose.connect(MONGODB_URL)
        .then(() => {
            try {
            createPost('Batman', 'hola', 'https://www.lacasadeel.net/wp-content/uploads/2022/11/batmancatwoman10-a-1068x539.jpg', 'hola', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('post created')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))