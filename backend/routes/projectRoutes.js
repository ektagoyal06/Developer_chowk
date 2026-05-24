import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

/* =========================
   CREATE PROJECT
========================= */
router.post("/", async (req, res) => {
  try {
    const {
      title,
      level,
      domain,
      description,
      members,
      applications,
      due,
      price,
      techStack,
      coverImage,
      postedBy,
      postedByName,
      userId,
    } = req.body;

    const project = await Project.create({
      title,
      level,
      domain,
      description,
      members,
      applications,
      due,
      price,
      techStack,
      coverImage,

      postedBy,
      postedByName,
      userId,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   GET ALL PROJECTS
========================= */
router.get("/", async (req, res) => {
  try {

    const projects = await Project.find()
      .sort({ createdAt: -1 });

    res.status(200).json(projects);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   DELETE PROJECT
========================= */
router.delete("/:id", async (req, res) => {
  try {

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;