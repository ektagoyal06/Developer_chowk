import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      default: "beginner",
    },

    price: {
      type: String,
      default: "$0",
    },

    description: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    // ✅ ADD THESE
    poster: {
      type: String,
      default: "",
    },

    posterUsername: {
      type: String,
      default: "",
    },

  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;