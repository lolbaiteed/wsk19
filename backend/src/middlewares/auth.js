import jwt from 'jsonwebtoken';
import { AuthError } from '../lib/errorClasses.js';

const JWT_SECRET = process.env.JWT_SECRET;

function parseCookie(cookieHeader) {
    return Object.fromEntries(
        cookieHeader.split('; ').map(cookie => {
            const [name, ...rest] = cookie.split('=');
            return [name, decodeURIComponent(rest.join('='))];
        })
    )
} 

export async function isLoggedIn(req, res, next) {
    try {
        const cookieHeader = req.headers.cookie;
        
        if (!cookieHeader) {
            throw new AuthError;
        } else {
            const cookie = parseCookie(cookieHeader);
            const token = cookie.token;

            jwt.verify(token, JWT_SECRET)
            return next();
        }
    } catch (error) {
        if (error instanceof AuthError) {
            return res.redirect('/');
        }
    }
}