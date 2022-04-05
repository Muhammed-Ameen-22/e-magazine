import express from 'express';

import { isLoggedIn }  from '../middlewares/isLoggedIn.js';
import { likePost,createPost } from '../controllers/posts.js';
import { changeStatus,rejectPost,acceptPost,getApprovedPosts,getAllPosts, getAllUsers,getEachPosts } from '../controllers/admin.js';

const router = express.Router();

router.post('/createpost', isLoggedIn, createPost);
router.get('/getAllUsers', getAllUsers);
router.get('/getAllPosts',getAllPosts);
router.get('/getApprovedPosts',getApprovedPosts)
router.post('/getEachPosts',getEachPosts);
router.post('/acceptPost',acceptPost);
router.post('/rejectPost',rejectPost);
router.post('/likePost',  likePost);
router.post('/changeStatus',changeStatus);
export default router;