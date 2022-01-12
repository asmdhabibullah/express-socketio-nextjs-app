import "dotenv/config";
import next, { NextApiHandler } from "next";
import express, { Express } from "express";
import { Server, createServer } from "http";
import { Socket } from "socket.io";
import { createProxyMiddleware } from "http-proxy-middleware";
import { getUsers, redySocketIo, setUser, updateUsers } from './socket';
import routers from "./routers";

const port = parseInt(process.env.PORT! || "3000", 10);
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle: NextApiHandler = nextApp.getRequestHandler();


const PROXY = createProxyMiddleware("/", {
    ws: true,
    changeOrigin: true,
    target: "ws://localhost:4500",
})

nextApp.prepare()
    .then(() => {
        const app: Express = express();
        const server: Server = createServer(app);

        const IO = redySocketIo(server);

        IO.on("connection", (socket: Socket) => {
            console.log("New user ping to server!");

            let users: any[] = [];

            socket.on("CONNECT_USER", ({ user }) => {
                // console.log(user);
                socket.join(user);


                setUser({ id: socket.id, user });


                console.log('User connected with socket successfully!');
                users = getUsers();
                socket.broadcast.emit("USERS", { users });

                // IO.emit("DEVICE_DATA", { user });
            })
            // socket.emit('status', 'Hello from Socket.io');

            socket.on('disconnect', (reason) => {
                console.log('client disconnected for the reason of: ' + reason);
                let index = -1;
                if (users.length >= 0) {
                    index = users.findIndex(e => e.id == socket.id);
                };

                // console.log("index", index);

                if (index >= 0) {
                    const leavedUser = users.filter(usr => usr.id === socket.id);
                    users.splice(index, 1);
                    updateUsers(users);
                    IO.emit("LEAVE_USER", { user: leavedUser, reason: reason });
                };
            });
        });

        app.use("/api", routers);

        app.all('*', (req: any, res: any) => {
            return handle(req, res);
        })

        server.listen(port, () => {
            // if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
