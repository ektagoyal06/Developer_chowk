import express from "express";
import bcrypt from "bcryptjs";
import Developer from "../models/Developer.js";

const router = express.Router();

/* ================= REGISTER ================= */

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      dcPassword,
      dob,
      location,
      tenth,
      twelfth,
      degree,
      college,
      cgpa,
      stacks,
      skills,
      github,
      linkedin,
      portfolio,
      lc,
      cf,
      projects,
      certs,
    } = req.body;

    // check existing email
    const existingUser = await Developer.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const developer = new Developer({
      name,
      email,
      password: hashedPassword,
      phone,
      dcPassword,
      dob,
      location,
      tenth,
      twelfth,
      degree,
      college,
      cgpa,
      stacks,
      skills,
      github,
      linkedin,
      portfolio,
      lc,
      cf,
      projects,
      certs,
    });

    await developer.save();

    res.status(201).json({
      success: true,
      message: "Developer registered successfully",
      developer,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* ================= LOGIN ================= */

router.post("/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const developer = await Developer.findOne({
      $or: [
        { email: emailOrPhone },
        { phone: String(emailOrPhone) },
      ],
    });

    if (!developer) {
      return res.status(400).json({
        message: "Account not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      developer.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
  success: true,
  message: "Login successful",
  developer,
  userId: developer._id,
});

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.get("/current-user", async (req, res) => {
  try {
    // latest registered/logged user
    const user = await Developer.findOne().sort({ createdAt: -1 });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;