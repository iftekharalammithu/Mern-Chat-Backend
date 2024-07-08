import express from "express";
import { getmessage, sendMessage } from "../Controllers/Message_controller.js";
import { protectroute } from "../Middle_ware/Message_Middle_ware.js";

const messageroute = express.Router();

messageroute.post("/message/:receiverid", protectroute, sendMessage);
messageroute.get("/:receiverid", protectroute, getmessage);

export default messageroute;
