import Conversation from "../Models/Conversation_Model.js";
import Message from "../Models/Message_Model.js";
import User from "../Models/User_Model.js";
import { receiver_socket_id } from "../Socket/Socket.js";

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
    // await conversation.save();
    // await newmessage.save();

    const getreceiversocket = receiver_socket_id(receiverid);
    if (getreceiversocket) {
      io.to(getreceiversocket).emit("new_message", newmessage);
    }

    // Save both the new message and the updated conversation concurrently
    await Promise.all([conversation.save(), newmessage.save()]);

    res.status(200).json(newmessage);
  } catch (err) {
    console.log("Error to send Message");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getmessage = async (req, res) => {
  try {
    const userToChatId = req.params.receiverid;
    const senderid = req.user;

    const userToChat = await User.findById(userToChatId);
    if (!userToChat) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find a conversation that includes both the sender and the recipient
    const conversation = await Conversation.findOne({
      participants: { $all: [senderid, userToChatId] }, // Match conversations with both participants
    }).populate("messages"); // Populate the messages field with the actual message data

    if (!conversation) {
      return res.status(200).json([]);
    }

    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error to get Message");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export { sendMessage, getmessage };
