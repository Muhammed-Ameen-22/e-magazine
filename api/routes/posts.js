import express from 'express';

import { createPost } from '../controllers/posts.js';


const router = express.Router();

router.post('/createpost', createPost);

export default router;