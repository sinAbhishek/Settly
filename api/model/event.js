import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    eventtitle: {
      type: String,
      required: true,
    },
    eventdetail: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    datetime: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Events", EventSchema);
