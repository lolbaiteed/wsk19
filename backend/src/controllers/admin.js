import prisma from "../lib/prisma.js";

export const showDashboard = async(req, res, next) => {
    try {
        const events = await prisma.events.findMany({});

        return res.status(200).json(events);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}