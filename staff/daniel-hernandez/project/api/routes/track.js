import express from 'express';
import handlers from '../handlers/index.js';
const router = express.Router();

router.route('/recent').get(handlers.getRecentPlaysHandler);
router.route('/like/:trackId').patch(handlers.likeTrackHandler);

export default router;
