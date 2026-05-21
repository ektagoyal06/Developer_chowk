import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    domain: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    link: {
      type: String,
      required: true,
    },

    postedBy: {
      type: String,
      default: "anjaliaroraa100",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "StudyMaterial",
  studyMaterialSchema
);