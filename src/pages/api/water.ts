import type { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "../../server/db/client";

const water = async (req: NextApiRequest, res: NextApiResponse) => {
    const wateringTime = req.body.waterTimeInMs
    const setWatering = await prisma.water.update({
        where: {
            id: 1,
        },
        data: {
            isWatering: true,
            waterTimeInMs: wateringTime,
        }
    })

    if (setWatering) {
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
