import express from "express";
import { createServer } from "http";
import router from "./router";
import { Server } from "socket.io";
import morgan from "morgan";
import cors from "cors";
//import db
import "./config/db";
//import sockets
import authSockets from "./api/auth/authSockets";
import config from "./config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: config.ORIGIN,
  })
);
app.use("/api", router);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: "/auth",
  cors: {
    origin: "*",
  },
});

//auth socket
authSockets(io);

export default httpServer;
