import express from 'express';
const router = express.Router();

import {generateOTP,validateOTP} from '../controllers/otp.js';

router.post('/generateOTP', generateOTP);
router.post('/validateOTP',validateOTP)
export default router;