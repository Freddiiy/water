import {prisma} from "../server/db/client";

export async function resetIsWatering() {
    await prisma.water.update({
        where: {
            id: 1,
        },
        data: {
            isWatering: false,
        }
    })
}