import express from 'express';
import handlers from '../handlers/index.js';
const router = express.Router();

router.route('/:trackId').post(handlers.streamTrackHandler);

export default router;
