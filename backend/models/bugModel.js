import mongoose from "mongoose";

const bugSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    reward: {
      type: Number,
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

    postedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bug = mongoose.model("Bug", bugSchema);

export default Bug;