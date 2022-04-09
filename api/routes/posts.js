import express from 'express';

import { isLoggedIn }  from '../middlewares/isLoggedIn.js';
import { getUserPosts,likePost,createPost } from '../controllers/posts.js';
import { createContest,changeStatus,rejectPost,acceptPost, getAllContest,getApprovedPosts,getAllPosts, getAllUsers,getEachPosts } from '../controllers/admin.js';

const router = express.Router();

router.post('/createpost', isLoggedIn, createPost);
router.get('/getAllUsers', getAllUsers);
router.get('/getAllPosts',getAllPosts);
router.get('/getApprovedPosts',getApprovedPosts)
router.post('/getEachPosts',getEachPosts);
router.post('/acceptPost',acceptPost);
router.post('/rejectPost',rejectPost);
router.post('/likePost',  isLoggedIn,likePost);
router.post('/changeStatus',changeStatus);
router.post('/createContest',createContest);
router.get('/getUserPosts', isLoggedIn,getUserPosts);
router.get('/getAllContest', getAllContest);


export default router;