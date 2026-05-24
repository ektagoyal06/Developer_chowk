import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
  {
    name: String,

    rating: {
      type: Number,
      default: 0,
    },

    sessions: {
      type: Number,
      default: 0,
    },

    title: String,

    description: String,

    duration: Number,

    price: Number,

    type: String,

    expertise: String,

    tags: [String],

    // ✅ ACTUAL USER NAME
    postedBy: {
      type: String,
      default: "",
    },

    // ✅ USERNAME
    postedUsername: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Mentor = mongoose.model("Mentor", mentorSchema);

export default Mentor;