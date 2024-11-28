import express from 'express';
const router = express.Router();
import { createUser, authUser, getUser } from '../handlers/index.js';

router.route('/').post(createUser);
router.route('/auth').post(authUser);
router.route('/:targetUserId').get(getUser);

export default router;
