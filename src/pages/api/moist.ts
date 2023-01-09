import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
export interface MoistRes {
    responseText: string,
}

const moist = async (req: NextApiRequest, res: NextApiResponse<MoistRes>) => {
    const waterRes = await axios.get("http://192.168.2.70:9000/moist");
    const data = await waterRes.data;
    if (waterRes.status == 200) {
        console.log(data);
        res.status(200).json({
            responseText: data,
        });
    } else {
        res.status(500);
    }
};

export default moist;
