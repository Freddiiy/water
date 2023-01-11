import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "../../server/db/client";
export interface MoistRes {
    responseText: string,
}

const moist = async (req: NextApiRequest, res: NextApiResponse) => {
    const moist = req.body.moisturePercent;
    const moistRes = await prisma.moistData.create({
        data: {
            value: moist,
        }
    });

    if (moistRes) {
        res.status(200);
    } else {
        res.status(500);
    }
};

export default moist;
