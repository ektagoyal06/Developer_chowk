import express from "express";
import Note from "../models/Note.js";

const router = express.Router();


// ================= GET ALL NOTES =================
router.get("/", async (req, res) => {
  try {

    const notes = await Note.find().sort({
      createdAt: -1,
    });

    res.json(notes);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ================= CREATE NOTE =================
router.post("/", async (req, res) => {
  try {

    const note = new Note(req.body);

    const savedNote = await note.save();

    res.status(201).json(savedNote);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ================= DELETE NOTE =================
router.delete("/:id", async (req, res) => {
  try {

    await Note.findByIdAndDelete(req.params.id);

    res.json({
      message: "Note deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;