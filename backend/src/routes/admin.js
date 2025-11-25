import express from 'express';
import { showDashboard } from '../controllers/admin.js';
import { isLoggedIn } from '../middlewares/auth.js';

const router = express.Router()

router.use(isLoggedIn);

router.post('/dashboard', isLoggedIn, showDashboard);

export default router;