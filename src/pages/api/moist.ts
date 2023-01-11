import type {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../server/db/client";

export interface Fail {
    responseText: string,
}

const moist = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "POST") {

        const moist:number = req.body.moisturePercent;

        if (moist > -1) {
            res.status(400).json({
                success: false,
            });
            return;
        }
        const moistRes = await prisma.moistData.create({
            data: {
                value: moist,
            }
        });

        if (moistRes) {
            res.status(200).json({
                success: true,
            });
        } else {
            res.status(500).json({
                success: false,
            })
        }
    } else {
        res.status(400).json({
            responseText: "Please use POST."
        })
    }
};

export default moist;
