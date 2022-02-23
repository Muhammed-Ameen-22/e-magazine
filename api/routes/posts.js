import express from 'express';

import { createPost } from '../controllers/posts.js';
import { getAllPosts, getAllUsers } from '../controllers/admin.js';

const router = express.Router();

router.post('/createpost', createPost);
router.get('/getAllUsers', getAllUsers);
router.get('/getAllPosts',getAllPosts)
export default router;