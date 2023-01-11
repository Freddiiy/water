import type { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "../../server/db/client";

const water = async (req: NextApiRequest, res: NextApiResponse) => {
    const threshold = req.body.threshold;
    const setThreshold = await prisma.water.update({
        where: {
            id: 1,
        },
        data: {
            threshold: threshold,
        }
    })

    if (setThreshold) {
        res.status(200).json({
            success: true,
        });
    } else {
        res.status(500).json({
            success: false,
        })
    }
};

export default water;
