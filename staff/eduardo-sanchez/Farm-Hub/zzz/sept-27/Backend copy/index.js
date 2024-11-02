import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import {
    registerUserHandler,
    authenticateUserHandler,
    createAdHandler,
    getAllAdsHandler,
    deleteAdHandler,
    getUsernameHandler,
    getUserInfoHandler,
    createAdCommentHandler,
    getAdHandler,
    deleteAdCommentHandler,
    searchAdsHandler,
    updateAdHandler,
    getUserAdsHandler,
    getUserCommentsHandler,
    errorHandler,
} from './handlers/index.js';

const { MONGODB_URL, PORT } = process.env;

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        const api = express();

        api.use(cors());

        api.get('/', (_, res) => res.send('Hello, Farmfan!'));

        const jsonBodyParser = express.json({
            strict: true,
            type: 'application/json',
        });

        api.post('/users', jsonBodyParser, registerUserHandler);

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler);

        api.post('/ads/createAd', jsonBodyParser, createAdHandler);

        api.get('/ads', getAllAdsHandler);

        api.get('/users/:targetUserId', getUsernameHandler);

        api.get('/users/:userId/userInfo', getUserInfoHandler);

        api.delete('/ads/:adId', deleteAdHandler);

        api.patch(
            '/ads/:adId/comments',
            jsonBodyParser,
            createAdCommentHandler
        );

        api.get('/ad/:adId', getAdHandler);

        api.get('/searchads/:searchText', searchAdsHandler);

        api.delete('/comments/:adId/:commentId', deleteAdCommentHandler);

        api.patch('/updatead/:adId', jsonBodyParser, updateAdHandler);

        api.get('/users/:userId/userAds', getUserAdsHandler);

        api.get('/users/:userId/userComments', getUserCommentsHandler);

        api.use(errorHandler);

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`));
    })
    .catch((error) => console.error(error));

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
