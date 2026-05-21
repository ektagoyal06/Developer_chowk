import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jobRoutes from "./routes/jobRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import developerRoutes from "./routes/developerRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"; // ⭐ IMPORT PROJECT ROUTES

dotenv.config();

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/developer", developerRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/projects", projectRoutes); // ⭐ PROJECT ROUTE

/* DATABASE */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ DB Error:", err);
  });

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("API Running...");
});

/* SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});