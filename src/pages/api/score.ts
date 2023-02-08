import clientPromise from "@/lib/db";
import { NextApiRequestWithSocket, NextApiResponseWithSocket } from "@/lib/types";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequestWithSocket, res: NextApiResponseWithSocket) {

    const handleDb = async (value : string, increment : boolean) => {
        try {
            const client = await clientPromise;
            const db = client.db("scoreboard");
            const collection = db.collection("score");
            const score = await collection.findOne({ _id: new ObjectId(process.env.DB_ITEM_ID) });
            if (!score) {
                return res.status(404).json({ message: "Score not found" });
            }
            const newScore = await collection.findOneAndUpdate({ _id: new ObjectId(process.env.DB_ITEM_ID) }, { $set: { [value]: score[value] + (increment ? 1 : -1) } });
            if (!newScore) {
                return res.status(500).json({ message: "Error updating score" });
            }
            console.log(newScore.value);
            req.io.emit("updateScore", newScore.value);
            return res.status(200).json({ message: "Score updated" });
        }
        catch (error) {
            return res.status(500).json({ message: "Error connecting to database" });
        }
    }

    const handlePost = async (req: NextApiRequestWithSocket, res: NextApiResponseWithSocket) => {
        const { action } = req.body;
        switch (action) {
            case "incLeftScore":
                await handleDb("leftScore", true);
                return;
            case "incRightScore":
                await handleDb("rightScore", true);
                return;
            case "decLeftScore":
                await handleDb("leftScore", false);
                return;
            case "decRightScore":
                await handleDb("rightScore", false);
                return;
            default:
                return res.status(400).json({ message: "Invalid action" });
        }
    }

    switch (req.method) {
        case "GET":
            try {
                const client = await clientPromise;
                const db = client.db("scoreboard");
                const collection = db.collection("score");
                const score = await collection.findOne({ _id: new ObjectId(process.env.DB_ITEM_ID) });
                if (!score) {
                    return res.status(404).json({ message: "Score not found" });
                }
                return res.status(200).json({ score });
            } catch (error) {
                return res.status(500).json({ message: "Error connecting to database" });
            }
        case "POST":
            if (!req.io) {
                return res.status(500).json({ message: "Socket not initialized" });
            } else {
                await handlePost(req, res);
                return;
            }
        default:
            return res.status(405).json({ message: "Method not allowed" });
    }

}
