import express from 'express';
import handlers from '../handlers/index.js';
const router = express.Router();

router.route('/follow/:targetUserId').patch(handlers.followUserHandler);
router.route('/profile/:targetUserId').get(handlers.getUserInfoHandler);

export default router;
