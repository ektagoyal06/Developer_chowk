import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    level: String,
    type: String,
    members: String,
    due: String,
    tags: [String],
    recruiting: Boolean,
    poster: String,
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;