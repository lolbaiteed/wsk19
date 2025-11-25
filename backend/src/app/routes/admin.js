import express from 'express';
const router = express.Router();
import showEvents from '../controllers/events.js';
import { isLoggedIn } from '../middlewares/auth.js';


router.get('/dashboard', isLoggedIn, showEvents, (req, res) => {
    return res.render('dashboard', {
        events: req.events 
    });
});

export default router;
