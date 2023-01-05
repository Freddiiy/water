// src/pages/api/examples.ts
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
export interface HealthRes {
    responseText: string,
}

const health = async (req: NextApiRequest, res: NextApiResponse) => {
    //const waterRes = await axios.get("http://localhost:9000/water");
    const rand = Math.floor(Math.random() * 2) + 1;

    const responseText = rand == 1 ? "Healthy" : "Unhealthy";
    res.status(200).json({
        status: 200,
    });
};

export default health;
