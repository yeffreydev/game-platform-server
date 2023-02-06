import { Socket, Server } from "socket.io";

const paintSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(socket.id);
    socket.on("draw", (data) => {
      socket.broadcast.emit("draw", data);
    });
  });
};

export default paintSocket;
