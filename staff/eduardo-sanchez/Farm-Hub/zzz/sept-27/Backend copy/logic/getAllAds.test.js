import 'dotenv/config';
import mongoose from 'mongoose';

import getAllAds from './getAllAds.js';

const { MONGODB_URL } = process.env;

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        try {
            getAllAds('66a939ddca799581a845711c')
                .then((ads) =>
                    console.log('ads retrieved', JSON.stringify(ads, null, 2))
                )
                .catch((error) => console.error(error));
        } catch (error) {
            console.error(error);
        }
    })
    .catch((error) => console.error(error));
