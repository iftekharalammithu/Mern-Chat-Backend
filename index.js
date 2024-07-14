import express from "express";
import dotenv from "dotenv";
import router from "./Route/auth_route.js";
import MongoDBConnect from "./DB/mongoDB_connect.js";
import messageroute from "./Route/Message_route.js";
import user_route from "./Route/User_route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./Socket/Socket.js";

dotenv.config();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;
// app.set("trust proxy", 1);
const corsOptions = {
  origin:
    "https://9000-idx-chat-app-mern-stack-1720103279964.cluster-7ubberrabzh4qqy2g4z7wgxuw2.cloudworkstations.dev",

  credentials: true,
};

// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// set the router
app.use("/api/auth/", router);
app.use("/api/messages/", messageroute);
app.use("/api/user/", user_route);

app.get("/", (req, res) => {
  res.send("Welcome to Chat Server!");
});

server.listen(port, () => {
  MongoDBConnect();
  console.log(`Listening on http://localhost:${port}`);
});
