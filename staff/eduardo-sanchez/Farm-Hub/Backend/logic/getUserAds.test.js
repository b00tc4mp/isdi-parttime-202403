import 'dotenv/config';
import mongoose from 'mongoose';

import getUserAds from './getUserAds.js';

const { MONGODB_URL } = process.env;

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        try {
            getUserAds('66f1722c61406529d96b1ccc')
                .then((ads) =>
                    console.log(
                        'userAds retrieved',
                        JSON.stringify(ads, null, 2)
                    )
                )
                .catch((error) => console.error(error.message));
        } catch (error) {
            console.error(error);
        }
    })
    .catch((error) => console.error(error));
