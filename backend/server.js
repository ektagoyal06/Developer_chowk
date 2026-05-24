import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import studyMaterialRoutes from "./routes/studyMaterialRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import bugRoutes from "./routes/bugRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import developerRoutes from "./routes/developerRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */

// IMPORTANT
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());
app.set("trust proxy", 1);


/* ================= ROUTES ================= */

app.use("/api/developer", developerRoutes);
app.use("/api/materials", studyMaterialRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/bugs", bugRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/projects", projectRoutes);

/* ================= DATABASE ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ DB Error:", err);
  });

/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {
  res.send("API Running...");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});