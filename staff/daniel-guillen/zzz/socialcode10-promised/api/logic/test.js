    import 'dotenv/config'
    import mongoose from 'mongoose'
    
    import createPost from './createPost.js'
    
    const { MONGODB_URL } = process.env
    
    mongoose.connect(MONGODB_URL)
        .then(() => {
            try {
            createPost('6686d791e8e3c7bcd9331b0b', 'Prueba 3', 'https://www.muycomputerpro.com/wp-content/uploads/2017/05/CONSTRUCCION.jpg', 'Prueba 3', error => {
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