import express from "express";
import Job from "../models/jobModel.js";

const router = express.Router();


// GET ALL JOBS
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// CREATE JOB
router.post("/", async (req, res) => {
  try {

    // Multiple jobs
    if (Array.isArray(req.body)) {

      const jobs = await Job.insertMany(req.body);

      return res.status(201).json(jobs);
    }

    // Single job
    const newJob = new Job(req.body);

    const savedJob = await newJob.save();

    res.status(201).json(savedJob);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE JOB
router.delete("/:id", async (req, res) => {
  try {

    await Job.findByIdAndDelete(req.params.id);

    res.json({ message: "Job deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;