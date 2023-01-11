import type {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../server/db/client";

const moist = async (req: NextApiRequest, res: NextApiResponse) => {

    const moistRes = await prisma.moistData.findMany();

    if (moistRes) {
        res.status(200);
    } else {
        res.status(500);
    }
};

export default moist;