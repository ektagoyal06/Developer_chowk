import express from "express";

import {
  getMaterials,
  createMaterial,
  deleteMaterial,
} from "../controllers/studyMaterialController.js";

const router = express.Router();

router.get("/", getMaterials);

router.post("/", createMaterial);

router.delete("/:id", deleteMaterial);

export default router;