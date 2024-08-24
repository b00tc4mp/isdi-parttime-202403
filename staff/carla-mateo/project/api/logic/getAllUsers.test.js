import 'dotenv/config'
import mongoose from 'mongoose';
import getAllUsers from './getAllUsers.js';

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllUsers('66be3bfaa0b65ba9d332f68e')
                .then((users) => {
                    console.log(users)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))