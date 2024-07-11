import jwt from "jsonwebtoken";
import User from "../Models/User_Model.js";

const protectroute = async (req, res, next) => {
  try {
    // console.log(req);
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "User Not Authorized!" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ message: "Invalid Token!" });
    }
    const user = await User.findById(verifyToken.userid).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User Not Found!" });
    }
    // console.log(user._id);
    req.user = user._id;

    next();
  } catch (error) {
    console.log("Error to send Message");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { protectroute };
