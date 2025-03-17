import express from 'express';
import handlers from '../handlers/index.js';
const router = express.Router();

router.route('/:playlistId').get(handlers.getPlaylistInfoHandler);
router.route('/follow/:playlistId').patch(handlers.followPlaylistHandler);

export default router;
