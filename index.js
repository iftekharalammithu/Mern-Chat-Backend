import express from "express";
import dotenv from "dotenv";
import router from "./Route/auth_route.js";
import MongoDBConnect from "./DB/mongoDB_connect.js";
import messageroute from "./Route/Message_route.js";
import user_route from "./Route/User_route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(cors());

app.use(express.json());
app.use(cookieParser());
// set the router
app.use("/api/auth/", router);
app.use("/api/messages/", messageroute);
app.use("/api/user/", user_route);

app.get("/", (req, res) => {
  res.send("Welcome to Chat Server!");
});

app.listen(port, () => {
  MongoDBConnect();
  console.log(`Listening on http://localhost:${port}`);
});
