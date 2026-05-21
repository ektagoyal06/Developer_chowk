import express from "express";
import Mentor from "../models/mentorModel.js";

const router = express.Router();


// GET ALL MENTORS
router.get("/", async (req, res) => {
  try {
    const mentors = await Mentor.find().sort({ createdAt: -1 });

    res.json(mentors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// CREATE MENTOR
router.post("/", async (req, res) => {
  try {
    const newMentor = new Mentor(req.body);

    const savedMentor = await newMentor.save();

    res.status(201).json(savedMentor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE MENTOR
router.delete("/:id", async (req, res) => {
  try {
    await Mentor.findByIdAndDelete(req.params.id);

    res.json({
      message: "Mentor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;