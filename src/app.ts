import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
//import db
import "./config/db";
//import sockets
import authSockets from "./api/auth/authSockets";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
