import jwt from "jsonwebtoken";
import User from "../Models/User_Model.js";

const protectroute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "User Not Authorized!" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      res.status(401).json({ message: "Invalid Token!" });
    }
    const user = await User.findById(verifyToken.userid).select("-password");
    if (!user) {
      res.status(401).json({ message: "User Not Found!" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log("Error to send Message");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { protectroute };
