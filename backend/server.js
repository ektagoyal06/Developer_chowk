import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import developerRoutes from "./routes/developerRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/developer", developerRoutes);

/* DATABASE */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

/* SERVER */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});