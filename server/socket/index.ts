import { Server } from 'http';
import { Server as SocketIoServer } from "socket.io";

let users: any[] = [];
let SocketIo: SocketIoServer;

export const useUsers = () => users;
export const useSocket = () => SocketIo;

export const redySocketIo = (server: Server) => {
    const IO: SocketIoServer = new SocketIoServer(server, {
        cors: {
            origin: `${process.env.PROD_API || process.env.DEV_API}`,
            methods: ["GET", "POST"]
        }
    });
    SocketIo = IO;
    return IO.attach(server);
}

export const setUser = (user: any) => {
    users.push(user)
}

export const getUsers = () => users;

export const updateUsers = (users: any) => {
    users = users;
}