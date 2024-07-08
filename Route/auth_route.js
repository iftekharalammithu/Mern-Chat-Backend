import express from "express";
import {
  userlogin,
  userlogout,
  usersignup,
} from "../Controllers/auth_controller.js";

const router = express.Router();

router.post("/signup", usersignup);

router.post("/logout", userlogout);

router.post("/login", userlogin);

router.post("/message", (req, res) => {
  res.send("message");
});

export default router;
