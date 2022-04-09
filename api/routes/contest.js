import express from 'express';
import { getCurrContest, startContest,stopContest,createContestPost, getCompContest } from '../controllers/contest.js';


const router = express.Router();


router.post('/startContest', startContest);
router.get('/getCurrContest', getCurrContest);
router.get('/getCompContest', getCompContest);
router.post('/stopContest',stopContest)
router.post('/createContestPost',createContestPost)

export default router;