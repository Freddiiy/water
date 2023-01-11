import type {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../server/db/client";
import {resetIsWatering} from "../../utils/resetIsWatering";

export interface MoistRes {
    responseText: string,
}

export interface Water {
    isWatering: boolean,
}

export interface MoistData {
    createdAt: Date,
    moisturePercent: number,
}

interface MouistBody {
    moisturePercent: number,
}


const poll = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "POST") {
        const resData = await handleMoist(req);
        res.status(200).json(resData)
        await resetIsWatering();
    } else {
        res.status(400).json({
            status: 400,
            statusText: "This endpoint only recieves POST requests."
        })
    }
};

async function handleMoist(req: NextApiRequest) {
    const data: MouistBody = req.body;
    const moist = data.moisturePercent;

    const moistRes = await prisma.moistData.create({
        data: {
            value: moist,
        }
    });

    const upsertWatering = await prisma.water.upsert({
        where: {
            id: 1,
        },
        update: {},
        create: {
            isWatering: false,
        }
    })

    const isWateringRes = await prisma.water.findUnique({
        where: {
            id: 1,
        }
    });

    if (isWateringRes) {
        return {
            isWatering: isWateringRes.isWatering,
            waterTimeInMs: isWateringRes.waterTimeInMs,
            threshold: isWateringRes.threshold,
        }
    }

    return {
        isWatering: false,
        waterTimeInMs: 0,
        threshold: 40,
    }
}


export default poll;
