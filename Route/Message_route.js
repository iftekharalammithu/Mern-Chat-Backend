import express from "express";
import { sendMessage } from "../Controllers/Message_controller.js";
import { protectroute } from "../Middle_ware/Message_Middle_ware.js";

const messageroute = express.Router();

messageroute.post("/message/:receiverid", protectroute, sendMessage);

export default messageroute;
