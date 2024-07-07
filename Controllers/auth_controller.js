import User from "../Models/User_Model.js";
import bcryptjs from "bcryptjs";
import generateToken from "../Utils/generateToken.js";

const usersignup = async (req, res) => {
  try {
    const { name, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password not match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }

    const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyprofilepic : girlprofilepic,
    });

    if (newUser) {
      generateToken(newUser._id, res); // its generate the token and cookie and send the cookie as response
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.log(error.message);
    res.send("signup failed");
  }
};

const userlogin = async (req, res) => {
  res.status(200).json({ message: "login" });
  console.log("login");
};

const userlogout = async (req, res) => {
  console.log("logout");
};

export { userlogin, userlogout, usersignup };
