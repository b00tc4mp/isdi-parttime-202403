import 'dotenv/config';
import mongoose from 'mongoose';

import updateAd from './updateAd.js';

const { MONGODB_URL } = process.env;

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        try {
            updateAd(
                '66c0e163c89ecaf42d52a2f9',
                '66f3c71782dce74d60a63d4b',
                'MElocotonESSSS',
                'CALANDRA',
                '6.40 €/Kg',
                '911-911-911'
            )
                .then((updateAd) =>
                    console.log('ad updated', JSON.stringify(updateAd, null, 2))
                )
                .catch((error) => console.error(error));
        } catch (error) {
            console.error(error);
        }
    })
    .catch((error) => console.error(error));
