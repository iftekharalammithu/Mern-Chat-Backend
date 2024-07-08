const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const senderid = req.params.senderID;
    const userid = req.userid;
  } catch (err) {
    console.log("Error to send Message");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { sendMessage };
