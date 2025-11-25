import prisma from "../../lib/prisma.js";

const showEvents = async (req, res, next) => {
    try {
        const events = await prisma.events.findMany({});

        req.events = events;
        next();
    } catch (error) {
        
    }
}

export default showEvents;