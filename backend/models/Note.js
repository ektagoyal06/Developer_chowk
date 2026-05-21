import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    domain: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      default: 0,
    },

    postedBy: {
      type: String,
      default: "anjaliaroraa100",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);