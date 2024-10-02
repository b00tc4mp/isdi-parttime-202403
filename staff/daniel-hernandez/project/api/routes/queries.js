import express from 'express';
import handlers from '../handlers/index.js';
const router = express.Router();

router.route('/').get(handlers.queryHandler);

export default router;
