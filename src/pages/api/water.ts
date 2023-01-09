import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const water = async (req: NextApiRequest, res: NextApiResponse) => {
    const waterRes = await axios.get("http://192.168.2.70:9000/water");
    const data = await waterRes.data;
    if (waterRes.status == 200) {
        res.status(200).json(data);
    } else {
        res.status(500);
    }
};

export default water;
