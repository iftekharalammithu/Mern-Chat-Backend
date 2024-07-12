import express from "express";
import { get_user_sidebar } from "../Controllers/get_user_sidebar.js";
import { protectroute } from "../Middle_ware/Message_Middle_ware.js";

const user_route = express.Router();

user_route.post("/", protectroute, get_user_sidebar);

export default user_route;
