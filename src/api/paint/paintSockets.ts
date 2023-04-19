import { Socket, Server } from "socket.io";
import { addNewPaintSocket, readOnlinePaints, removePaintSocket } from "../../lib/data/online_paint";

interface CustomPaintSocket extends Socket {
  paintId?: string;
}
const paintSocket = (io: Server) => {
  io.on("connection", (socket: CustomPaintSocket) => {
    socket.on("new-user", (data) => {
      if (!data.paintId) return null;
      socket.paintId = data.paintId;
      addNewPaintSocket(data.paintId, socket.id);
    });
    socket.on("draw", async (data) => {
      const paintSockets = await readOnlinePaints(socket.paintId!);
      paintSockets.map((sId) => {
        socket.broadcast.to(sId).emit("draw", data);
      });
      // socket.broadcast.emit("draw", data);
    });
    socket.on("disconnect", () => {
      if (!socket.paintId) return null;
      removePaintSocket(socket.paintId, socket.id);
    });
  });
};

export default paintSocket;
