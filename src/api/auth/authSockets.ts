import { Server, Socket } from "socket.io";

const authSockets = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("connected");
  });
};

export default authSockets;
