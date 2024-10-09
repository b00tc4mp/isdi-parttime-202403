import 'dotenv/config';
import mongoose from 'mongoose';

import getUserComments from './getUserComments.js';

const { MONGODB_URL } = process.env;

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        try {
            getUserComments('66fb19dabd1e1b6e0a20fa94')
                .then((ads) =>
                    console.log(
                        'userComments retrieved',
                        JSON.stringify(ads, null, 2)
                    )
                )
                .catch((error) => console.error(error));
        } catch (error) {
            console.error(error);
        }
    })
    .catch((error) => console.error(error));
