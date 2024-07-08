import Conversation from "../Models/Conversation_Model.js";
import Message from "../Models/Message_Model.js";

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverid = req.params.receiverid;
    const senderid = req.user;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderid, receiverid] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderid, receiverid],
      });
    }
    const newmessage = new Message({
      senderId: senderid,
      receiver: receiverid,
      message: message,
    });
    if (newmessage) {
      conversation.messages.push(newmessage._id);
    }
    await conversation.save();
    await newmessage.save();

    res.status(200).json(newmessage);
  } catch (err) {
    console.log("Error to send Message");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { sendMessage };
