import express from 'express';

import { likePost,createPost } from '../controllers/posts.js';
import { rejectPost,acceptPost,getApprovedPosts,getAllPosts, getAllUsers,getEachPosts } from '../controllers/admin.js';

const router = express.Router();

router.post('/createpost', createPost);
router.get('/getAllUsers', getAllUsers);
router.get('/getAllPosts',getAllPosts);
router.get('/getApprovedPosts',getApprovedPosts)
router.post('/getEachPosts',getEachPosts);
router.post('/acceptPost',acceptPost);
router.post('/rejectPost',rejectPost);
router.post('/likePost',likePost);
export default router;