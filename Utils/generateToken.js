import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (userid, res) => {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expires in 30 days
    httpOnly: true, // Prevent client-side access to the cookie
    sameSite: "Lax", // Prevent CSRF attacks
    secure: true,
    domain: "mern-chat-backend-3af8.onrender.com",
    path: '/', 
  });
};

export default generateToken;
