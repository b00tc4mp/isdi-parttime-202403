import mongoose, { connect } from 'mongoose';
import 'dotenv/config'
import getExercisesCount from './getExercisesCount.js';

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getExercisesCount('66a94dcb34505782bcd8cfd0', '66c1fbba04735a9cfdd94859')
                .then((exercises => console.log('retrieved exercises', exercises)))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })