import prisma from "../../lib/prisma.js";
import { hashPassword, verifyHash } from "../../lib/hash.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.organizers.findFirst({
            where: {
                email,
            },
        });

        if (!user) throw new Error("No user found");

        if (!user.password_hash || user.password_hash.length === 0) {
            const newHash = await hashPassword(password);
            await prisma.organizers.update({
                where: {
                    id: user.id,
                },
                data: {
                    password_hash: newHash,
                },
            });
        }

        const passMatch = await verifyHash(password, user.password_hash);

        if (!passMatch) throw new Error;

        res.status(200).json(user);

    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ error: "Email or password are incorrect"});
        }
    }
}