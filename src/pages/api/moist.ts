import type {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../server/db/client";

export interface Fail {
    responseText: string,
}

export interface MoistData {
    createdAt: Date,
    value: number,
}

const moist = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("aaaaaaaaaaaa");
    if (req.method == "POST") {

        const moist = req.body.moisturePercent;
        console.log("bbbbbbbbbbbbbb");

        if (!moist) {
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

        console.log("ccccccccccccc");

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
