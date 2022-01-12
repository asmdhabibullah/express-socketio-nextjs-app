import { Request, Response } from "express";
import { useUsers, useSocket } from './../socket';

export const getDataFromEsp32AndPost = async (req: Request, res: Response) => {
    try {
        console.log("Body", req.body);
        const users = useUsers();
        const socket = useSocket();
        // console.log("CONNECTED_USER", CONNECTED_USER);
        if (socket && users.length > -1) {
            socket.emit("DEVICE_DATA", { data: req.body });
            return res.status(200).json({ message: "Device data sended successfully!" });
        }
        // CONNECTED_USER.forEach((user, idx) => {
        //     const { room } = user;
        //     console.log(`Room ${idx}: ${room}`);
        // });
        return res.status(404).json({ message: "Active user not found." });
    } catch (error) {
        return res.status(500).json({ message: "Server responsr errore." });
    }
};