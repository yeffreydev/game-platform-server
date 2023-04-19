import express from "express";
import { createServer } from "http";
import router from "./router";
import { Server } from "socket.io";
import morgan from "morgan";
import cors from "cors";
import path from "path";
//import db
import "./config/db";
//import sockets
import authSockets from "./api/auth/authSockets";
import paintSocket from "./api/paint/paintSockets";

//scripts
import createDataFoldersScript from "./scripts/createDataFolders";

//config
import config from "./config";

const app = express();

//run start scripts
createDataFoldersScript.init();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: config.ORIGIN,
  })
);
app.use("/api", router);

// server public folder (static files);
app.use("/public", express.static(path.join(__dirname, "./../public")));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: "/auth",
  cors: {
    origin: "*",
  },
});

const paintIo = new Server(httpServer, {
  path: "/paint",
  cors: {
    origin: "*",
  },
});

//auth socket
authSockets(io);
//paint socket
paintSocket(paintIo);

export default httpServer;
