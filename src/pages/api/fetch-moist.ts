import type {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../server/db/client";
export interface MoistData {
    createdAt: Date,
    value: number,
}
const moist = async (req: NextApiRequest, res: NextApiResponse) => {

    const moistRes = await prisma.moistData.findMany();

    if (moistRes) {
        res.status(200).json(moistRes);
    } else {
        res.status(500);
    }
};

export default moist;