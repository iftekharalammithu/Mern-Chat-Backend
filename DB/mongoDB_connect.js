import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URL;

const MongoDBConnect = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Database Not Connected", error.message);
  }
};

export default MongoDBConnect;
