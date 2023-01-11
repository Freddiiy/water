import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
export interface HealthRes {
    responseText: string,
}

const health = async (req: NextApiRequest, res: NextApiResponse<HealthRes>) => {
    res.status(200).json({responseText: "water"});
};

export default health;
