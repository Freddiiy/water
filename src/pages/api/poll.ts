import type { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "../../server/db/client";
export interface MoistRes {
    responseText: string,
}

export interface Water {
    ip: string,
    isWatering: boolean,
    moistData: MoistData[],
}

export interface MoistData {
    createdAt: Date,
    value: number,
}



const moist = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "POST") {
        handleMoist(req);
    } else {
        res.status(400).json({
            status: 400,
            statusText: "This endpoint only recieves POST requests"
        })
    }
};

async function handleMoist(req: NextApiRequest) {
    const data: Water = req.body;

    if (!req.socket.remoteAddress) return;

    /*
    const prismaRes = await prisma.water.upsert({
        where: {
            ip: req.socket.remoteAddress,

        }
    })
     */
}

export default moist;
