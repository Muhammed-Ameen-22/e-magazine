import express from 'express';
import { likePost,getEachContestPosts,getCurrContest, acceptContestPost, 
    rejectContestPost,getApprovedContestPosts, startContest,stopContest,
    getEachContest,createContestPost, getCompContest, getWinnerContestPost } from '../controllers/contest.js';

import { isLoggedIn }  from '../middlewares/isLoggedIn.js';
import {makeWinnerContest} from '../controllers/admin.js';

const router = express.Router();


router.post('/startContest', startContest);
router.get('/getCurrContest', getCurrContest);
router.get('/getCompContest', getCompContest);
router.post('/stopContest',stopContest)
router.post('/createContestPost',isLoggedIn,createContestPost)
router.post('/getEachContest',getEachContest);
router.post('/rejectContestPost',rejectContestPost);
router.post('/acceptContestPost',acceptContestPost);
router.post('/getApprovedContestPosts',getApprovedContestPosts)
router.post('/getEachContestPosts',isLoggedIn,getEachContestPosts)
router.post('/likePost',isLoggedIn,likePost)
router.post('/makeWinnerContest',makeWinnerContest)
router.post('/getWinnerContestPost',getWinnerContestPost)
export default router;