import { NextApiResponseWithSocket } from "@/lib/types";
import { NextApiRequest } from "next";
import { Server } from "socket.io";

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
    if (res.socket?.server.io) {
        return res.status(400).json({ message: "Socket already initialized" });
    }
    else {
        const io = new Server(res.socket.server);
        res.socket.server.io = io;
        return res.status(200).json({ message: "Socket initialized" });
    }
}
