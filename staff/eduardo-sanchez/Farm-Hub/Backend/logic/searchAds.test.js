import 'dotenv/config';
import mongoose from 'mongoose';

import searchAds from './searchAds.js';

const { MONGODB_URL } = process.env;

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        try {
            searchAds('p', { lat: 39.466945, lng: -6.3758094 }, 50)
                .then((ads) =>
                    console.log(
                        'ads with search query & proximity location retrieved',
                        JSON.stringify(ads, null, 2)
                    )
                )
                .catch((error) => console.error(error));
        } catch (error) {
            console.error(error);
        }
    })
    .catch((error) => console.error(error));
