import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

      // EDUCATION
      tenth,
      twelfth,

      degree,
      actualDegree,

      degreeDomain,
      actualDomain,

      college,
      actualCollegeName,

      cgpa,

      // TECH STACK
      stacks,
      skills,

      // GOALS
      aims,

      // SOCIAL LINKS
      github,
      linkedin,
      portfolio,
      resumeLink,
      lc,
      cf,

      // PROJECTS & CERTIFICATIONS
      projects,
      certs,

    } = req.body;

    /* ================= CHECK EXISTING USER ================= */

    const existingUser = await Developer.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    /* ================= HASH PASSWORD ================= */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* ================= CREATE DEVELOPER ================= */

    const developer = new Developer({
      name,
      email,
      password: hashedPassword,
      phone,
      dcPassword,
      dob,
      location,

      // EDUCATION
      tenth,
      twelfth,

      degree,
      actualDegree,

      degreeDomain,
      actualDomain,

      college,
      actualCollegeName,

      cgpa,

      // TECH
      stacks,
      skills,

      // GOALS
      aims,

      // LINKS
      github,
      linkedin,
      portfolio,
      resumeLink,
      lc,
      cf,

      // PROJECTS & CERTIFICATIONS
      projects,
      certs,
    });

    /* ================= SAVE USER ================= */

    await developer.save();

    return res.status(201).json({
      success: true,
      message: "Developer registered successfully",
      developer,
    });

  } catch (error) {

    console.log("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* ================= LOGIN ================= */

router.post("/login", async (req, res) => {
  try {

    const { emailOrPhone, password } = req.body;

    // FIND USER
    const developer = await Developer.findOne({
      $or: [
        { email: emailOrPhone },
        { phone: emailOrPhone },
      ],
    });

    if (!developer) {
      return res.status(400).json({
        success: false,
        message: "Account not found",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      developer.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      {
        id: developer._id,
      },
      "developerchowksecret",
      {
        expiresIn: "7d",
      }
    );

    // SAVE COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      developer,
    });

  } catch (error) {

    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* ================= CURRENT USER ================= */

router.get("/current-user", async (req, res) => {
  try {

    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not logged in",
      });
    }

    const decoded = jwt.verify(
      token,
      "developerchowksecret"
    );

    const developer = await Developer.findById(decoded.id)
      .select("-password");

    if (!developer) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      developer,
    });

  } catch (error) {

    console.log("CURRENT USER ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
});

/* ================= LOGOUT ================= */

router.post("/logout", (req, res) => {

  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export default router;