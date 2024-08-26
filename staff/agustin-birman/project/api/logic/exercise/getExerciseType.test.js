import mongoose, { connect } from 'mongoose';
import 'dotenv/config'
import getExerciseType from './getExerciseType.js';

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getExerciseType('66a94dcb34505782bcd8cfd0', '66c8e62aa9af79afcc6f9f9c')
                .then((exercises => console.log('retrieved ', exercises)))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })