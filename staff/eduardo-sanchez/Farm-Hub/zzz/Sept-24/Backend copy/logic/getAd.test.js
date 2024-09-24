import 'dotenv/config';
import mongoose from 'mongoose';

import getAd from './getAd.js';

const { MONGODB_URL } = process.env;

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        try {
            getAd('66f1635fecf052928861ff59')
                .then((ad) => console.log(JSON.stringify(ad, null, 2)))
                .catch((error) => console.error(error.message));
        } catch (error) {
            console.error(error);
        }
    })
    .catch((error) => console.error(error.message));
