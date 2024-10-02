import 'dotenv/config';
import mongoose from 'mongoose';

import getAd from './getAd.js';

const { MONGODB_URL } = process.env;

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        try {
            getAd('66fd66b0a8afff3e24aedb27')
                .then((ad) =>
                    console.log('ad retrieved', JSON.stringify(ad, null, 2))
                )
                .catch((error) => console.error(error.message));
        } catch (error) {
            console.error(error);
        }
    })
    .catch((error) => console.error(error.message));
