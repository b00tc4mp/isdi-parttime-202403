import express from 'express';
import handlers from '../handlers/index.js';
const router = express.Router();

router.route('/:albumId').get(handlers.getAlbumInfoHandler);

export default router;
