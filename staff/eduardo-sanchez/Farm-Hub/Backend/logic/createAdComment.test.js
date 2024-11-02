import 'dotenv/config';
import mongoose from 'mongoose';
import createAdComment from './createAdComment.js';

const { MONGODB_URL } = process.env;

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        try {
            createAdComment(
                '66c0e163c89ecaf42d52a2f9',
                '66f2df667da5de41d6723297',
                'Comment Testing'
            )
                .then(() => {
                    console.log('Comment Created');
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    })
    .catch((error) => console.error(error));
