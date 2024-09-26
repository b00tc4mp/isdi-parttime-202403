import getExercises from './getExercises.js';
import mongoose, { connect } from 'mongoose';
import 'dotenv/config'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getExercises('66a94dcb34505782bcd8cfd0', '66c8c1742d29b9711d7c8a41')
                .then((exercises => console.log('retrieved exercises', exercises)))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })