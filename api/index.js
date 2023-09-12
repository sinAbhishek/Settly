import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Routes from "./router/routes.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000;
const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MongoUrl);
    console.log("success");
  } catch (error) {
    throw error;
  }
};
app.use(cors());
app.use(express.json());
app.use("/api", Routes);
app.use((err, req, res) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  mongoConnect();
  console.log("connected");
});
