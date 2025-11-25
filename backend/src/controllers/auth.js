import prisma from "../lib/prisma.js";
import { hashPassword, verifyHash } from '../lib/hash.js';
import { AuthError } from '../lib/errorClasses.js';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET;

export const login = async(req, res, next) => {
    try {

        if (!req.body) throw new AuthError("Empty request body received", 400);
        const { email, password } = req.body;
        if (!email || !password) throw new AuthError("Email or password cannot be empty", 400);

        const user = await prisma.organizers.findFirst({
            where: {
                email: email
            }
        });

        if (!user) throw new AuthError("User with this email does not exists", 401);

        if (!user.password_hash) {
            const newHash = await hashPassword(password);
            console.log(newHash)
            await prisma.organizers.update({
                where: {
                    id: user.id,
                },
                data: {
                    password_hash: newHash,
                },
            });

            const passMatch = await verifyHash(password, user.password_hash);

            if (!passMatch) throw new AuthError("Password is incorrect", 401);
        }

        const passMatch = await verifyHash(password, user.password_hash);

        if (!passMatch) throw new AuthError("Password is incorrect", 401);

        const token = jwt.sign({userId: user.id}, JWT_SECRET, { expiresIn: "1d"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });


        return res.status(200).json({
            message: "Logged in",
            token: token,
            user: {
                id: user.id,
                email: user.email,
                slug: user.slug
            }
        })
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(error.errorCode).json(error.message);
        } else {
            return res.status(500).json(error.message);
        }
    }
}