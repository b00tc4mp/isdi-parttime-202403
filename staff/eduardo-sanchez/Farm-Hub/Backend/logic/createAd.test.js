import 'dotenv/config';
import mongoose from 'mongoose';

import createAd from './createAd.js';

const { MONGODB_URL } = process.env;

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        try {
            // createAd('66a939ddca799581a845711c', 'tomates', 'tomates de ensalada', '3.20 €/Kg')
            createAd(
                '66ae6370f11082ed7f0623dd',
                'manzanas',
                'manzana golden',
                '4.10 €/Kg',
                { lat: 0, lng: 0 }
            )
                .then(() => console.log('Ad created'))
                .catch((error) => console.error(error));
        } catch (error) {
            console.error(error);
        }
    })
    .catch((error) => console.error(error));
