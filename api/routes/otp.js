import express from 'express';
const router = express.Router();

import {generateOTP} from '../controllers/otp.js';

router.post('/generateOTP', generateOTP);

export default router;