import { NextApiRequestWithSocket, NextApiResponseWithSocket } from "@/lib/types";

export default function handler(req: NextApiRequestWithSocket, res: NextApiResponseWithSocket) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    } else {
        if (!req.io) {
            return res.status(500).json({ message: "Socket not initialized" });
        } else {
            let data: any;
            switch (req.body.action) {
                case "incLeftScore":
                    req.io.emit("incLeftScore", (response: any) => {
                        console.log("Response socket", response);
                        data = response;
                    });
                    return res.status(200).json({ score: data?.score });
                case "incRightScore":
                    req.io.emit("incRightScore", (response: any) => {
                        console.log("Response socket", response);
                        data = response;
                    });
                    return res.status(200).json({ score: data?.score });
                default:
                    return res.status(400).json({ message: "Invalid action" });
            }
        }
    }
}
