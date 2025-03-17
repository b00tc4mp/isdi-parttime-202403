import express from 'express';
import handlers from '../handlers/index.js';
const router = express.Router();

router.route('/:track').get(handlers.streamHandler);

export default router;
