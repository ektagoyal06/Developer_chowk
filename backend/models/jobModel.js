import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    level: String,
    price: String,
    description: String,
    tags: [String],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;