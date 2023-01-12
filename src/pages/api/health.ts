import type { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "../../server/db/client";
export interface HealthRes {
    responseText: string,
}

const health = async (req: NextApiRequest, res: NextApiResponse<HealthRes>) => {
    const latestUpdateArray = await prisma.moistData.findMany({
        take: -1,
    })
    const latestUpdateRaw = latestUpdateArray[0];

    if (!latestUpdateRaw    ) {
        res.status(500).json({
            responseText: "Zero results from db",
        });
        return;
    }
    const latestUpdate = new Date(latestUpdateRaw.createdAt)
    const currentTime = new Date();

    const isHealthy = currentTime.getTime() - latestUpdate.getTime() < (30 * 1000) ? "Online" : "Offline"


    res.status(200).json({responseText: isHealthy});
};

export default health;
