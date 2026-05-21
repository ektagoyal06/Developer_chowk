import express from "express";
import Bug from "../models/bugModel.js";

const router = express.Router();


// GET ALL BUGS
router.get("/", async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });

    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// CREATE BUG
router.post("/", async (req, res) => {
  try {

    // Insert multiple bugs
    if (Array.isArray(req.body)) {

      const bugs = await Bug.insertMany(req.body);

      return res.status(201).json(bugs);
    }

    // Insert single bug
    const newBug = new Bug(req.body);

    const savedBug = await newBug.save();

    res.status(201).json(savedBug);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE BUG
router.delete("/:id", async (req, res) => {
  try {

    await Bug.findByIdAndDelete(req.params.id);

    res.json({ message: "Bug deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;