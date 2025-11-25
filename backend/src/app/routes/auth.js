import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post('/login', login);

router.post('/logout', (_req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        path: '/',
    })
    return res.redirect('/');
});

export default router;