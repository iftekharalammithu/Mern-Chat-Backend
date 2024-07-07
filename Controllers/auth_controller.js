const usersignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    res.send("signup successfull");
    console.log(name, email, password);
  } catch (error) {
    console.log(error);
    res.send("signup failed");
  }
};

const userlogin = async (req, res) => {
  console.log("login");
};

const userlogout = async (req, res) => {
  console.log("logout");
};

export { userlogin, userlogout, usersignup };
