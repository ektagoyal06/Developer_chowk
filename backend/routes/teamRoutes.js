import express from "express";
import Team from "../models/teamModel.js";

const router = express.Router();


// GET ALL TEAMS
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// CREATE TEAM
router.post("/", async (req, res) => {
  try {

    if (Array.isArray(req.body)) {

      const teams = await Team.insertMany(req.body);

      return res.status(201).json(teams);
    }

    const newTeam = new Team(req.body);

    const savedTeam = await newTeam.save();

    res.status(201).json(savedTeam);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE TEAM
router.delete("/:id", async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);

    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;