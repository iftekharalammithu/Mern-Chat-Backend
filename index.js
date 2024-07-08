import express from "express";
import dotenv from "dotenv";
import router from "./Route/auth_route.js";
import MongoDBConnect from "./DB/mongoDB_connect.js";
dotenv.config();

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;
app.use(express.json());

// set the router
app.use("/api/auth/", router);
// app.use("/api/message/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  MongoDBConnect();
  console.log(`Listening on http://localhost:${port}`);
});
