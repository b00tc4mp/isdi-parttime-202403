import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        // try {
        //     registerUser('Inaki', 'Barrera', 'inaki@barrera.com', '123123')
        //         .then(() => console.log('User created'))
        //         .catch(error => console.error(error))
        // } catch (error) {
        //     console.error(error)
        // }

        try {
            registerUser('Adrian', 'AdrianGon', 'adrian@gon.com', '123123')
                .then(() => console.log('User created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))