import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
      default: "Beginner",
    },

    domain: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    members: {
      type: String,
      default: "0/0 members",
    },

    applications: {
      type: String,
      default: "0 applications",
    },

    due: {
      type: String,
      default: "N/A",
    },

    price: {
      type: Number,
      default: 0,
    },

    techStack: {
      type: [String],
      default: [],
    },

    coverImage: {
      type: String,
      default: "",
    },

    // =========================
    // USER INFO
    // =========================

    postedBy: {
      type: String,
      default: "Unknown User",
    },

    postedByName: {
      type: String,
      default: "Anonymous",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Developer",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);