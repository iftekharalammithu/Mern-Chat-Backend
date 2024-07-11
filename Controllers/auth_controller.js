import User from "../Models/User_Model.js";
import bcryptjs from "bcryptjs";
import generateToken from "../Utils/generateToken.js";

const usersignup = async (req, res) => {
  try {
    const { name, username, password, confirmPassword, gender } = req.body;
    // console.log(req.body);
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
      res.status(200).json({
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
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isMatch = await bcryptjs.compare(password, user?.password || "");
    if (!user || !isMatch) {
      res.status(400).json({ Error: "Invalid Username or Password!" });
    } else {
      generateToken(user._id, res);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        profilePic: user.profilePic,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: "Login Failed" });
  }
};

const userlogout = async (req, res) => {
  try {
    res.cookie(process.env.JWS_NAME, "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.json({ message: "Logout Successfull" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: "Logout Failed" });
  }
};

export { userlogin, userlogout, usersignup };
