import express from 'express';
import handlers from '../handlers/index.js';
const router = express.Router();

router.route('/login').post(handlers.loginHandler);
router.route('/register').post(handlers.registerHandler);

export default router;
