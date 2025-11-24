import prisma from "../../lib/prisma.js";
import { hashPassword, verifyHash } from "../../lib/hash.js";
import { AuthError } from "../../lib/errorClasses.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === undefined || password === undefined) throw new AuthError("Email or password cannot be empty", 400);
    const user = await prisma.organizers.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new AuthError("User not found", 400);

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

      const passMatch = await verifyHash(password, user.password_hash);

      if (!passMatch) throw new AuthError("Password is not correct", 401);
    }

    const passMatch = await verifyHash(password, user.password_hash);

    if (!passMatch) throw new AuthError("Password is not correct", 401);

    res.redirect('/dashboard');

  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(error.errorCode).json({ error: error.message })
    }
  }
}
