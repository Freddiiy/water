// src/pages/api/examples.ts
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const water = async (req: NextApiRequest, res: NextApiResponse) => {
    const waterRes = await axios.get("http://192.168.2.70:9000/water");
    const data = await waterRes.data;
    res.status(200).json(data);
};

export default water;
