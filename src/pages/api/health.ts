// src/pages/api/examples.ts
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
export interface HealthRes {
    responseText: string,
}

const health = async (req: NextApiRequest, res: NextApiResponse) => {
    const waterRes = await axios.get("http://192.168.2.70:9000/health");
    const data = waterRes.data;
    let responseText = "Unhealthy";
    console.log(data)
    if (waterRes.status == 200) {
       responseText = "Healthy";
    }
    res.status(200).json({
        status: responseText,
    });
};

export default health;
