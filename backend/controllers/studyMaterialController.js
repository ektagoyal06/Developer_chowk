
import StudyMaterial from "../models/studyMaterialModel.js";


// ================= GET ALL =================
export const getMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().sort({
      createdAt: -1,
    });

    res.status(200).json(materials);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= CREATE =================
export const createMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.create(req.body);

    res.status(201).json(material);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= DELETE =================
export const deleteMaterial = async (req, res) => {
  try {
    await StudyMaterial.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Material deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};