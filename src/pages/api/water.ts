// src/pages/api/examples.ts
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const water = async (req: NextApiRequest, res: NextApiResponse) => {
    //const waterRes = await axios.get("http://localhost:9000/water");
    res.status(200).json("WOW");
};

export default water;
