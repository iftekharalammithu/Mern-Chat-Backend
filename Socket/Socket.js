import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://9000-idx-chat-app-mern-stack-1720103279964.cluster-7ubberrabzh4qqy2g4z7wgxuw2.cloudworkstations.dev",
    ],
    methods: ["GET", "POST"],
  },
});

const usersocketmap = {};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  const userid = socket.handshake.query.userid;
  if (userid != "undefined") {
    usersocketmap[userid] = socket.id;
    console.log("usersocketmap", usersocketmap);
    console.log("obj key:", Object.keys(usersocketmap));
  }
  io.emit("user_online", Object.keys(usersocketmap));

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    delete usersocketmap[userid];
    io.emit("user_online", Object.keys(usersocketmap));
  });
});

const receiver_socket_id = (userid) => {
  return usersocketmap[userid];
};

export { app, io, server, receiver_socket_id };
