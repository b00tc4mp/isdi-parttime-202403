import 'dotenv/config';
import mongoose from 'mongoose';

import createAd from './createAd.js';

const { MONGODB_URL } = process.env;

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        try {
            // createAd(
            //     '66a939ddca799581a845711c',
            //     'tomates',
            //     'tomates de ensalada',
            //     '3.20 €/Kg',
            //     '092-092-092',
            //     { lat: 40.044161, lng: -6.081607 }
            // )
            createAd(
                '66ae6370f11082ed7f0623dd',
                'POMELO',
                'amarillo',
                '4.10 €/Kg',
                '092-092-092',
                { lat: 39.457367, lng: -5.839293 }
            )
                .then(() => console.log('Ad created'))
                .catch((error) => console.error(error));
        } catch (error) {
            console.error(error);
        }
    })
    .catch((error) => console.error(error));

//  Plasencia 40.044161, -6.081607;
