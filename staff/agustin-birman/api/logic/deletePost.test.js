import deletePost from './deletePost'
import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGODB_URL } = process.env


mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deletePost('pepitogrillo', '8826114904894882-1716924151128', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('post deleted')
            })
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))


