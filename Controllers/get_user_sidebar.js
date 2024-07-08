import User from "../Models/User_Model.js";

const get_user_sidebar = async (req, res) => {
  try {
    const login_user = req.user;
    const users = await User.find({ _id: { $ne: login_user } }).select(
      "-password"
    );
    res.status(200).json({ users });
    // res.status(200).json({
    //   users: users.map((user) => ({
    //     _id: user._id,
    //     name: user.name,
    //     username: user.username,
    //     gender: user.gender,
    //     profilePic: user.profilePic,
    //   })),
    // });
  } catch (error) {
    console.log("Error to get Message");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { get_user_sidebar };
