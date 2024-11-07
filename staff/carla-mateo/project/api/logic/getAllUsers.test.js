import 'dotenv/config'
import mongoose from 'mongoose';
import getAllUsers from './getAllUsers.js';

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllUsers('66cb5c15ce0823db99872fcb')
                .then((users) => {
                    console.log(users)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))