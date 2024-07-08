import express from "express";
import dotenv from "dotenv";
import router from "./Route/auth_route.js";
import MongoDBConnect from "./DB/mongoDB_connect.js";
import messageroute from "./Route/Message_route.js";
import cookies from "cookie-parser";
import user_route from "./Route/User_route.js";

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;
app.use(express.json());
app.use(cookies());

// set the router
app.use("/api/auth/", router);
app.use("/api/messages/", messageroute);
app.use("/api/user/", user_route);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  MongoDBConnect();
  console.log(`Listening on http://localhost:${port}`);
});
