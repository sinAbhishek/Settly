import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tickets: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Users", UserSchema);
