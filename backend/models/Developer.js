import mongoose from "mongoose";

const developerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    dcPassword: {
      type: String,
      required: true,
    },

    dob: String,

    location: String,

    // ===== EDUCATION =====

    tenth: Number,

    twelfth: Number,

    degree: String,

    degreeDomain: String,

    college: String,

    actualCollegeName: String,

    cgpa: Number,

    // ===== TECH STACK =====

    stacks: [String],

    skills: [String],

    // ===== GOALS ON DC =====

    aims: [String],

    // ===== SOCIAL LINKS =====

    github: String,

    linkedin: String,

    portfolio: String,

    // ===== RESUME =====

    resumeLink: String,

    lc: String,

    cf: String,

    // ===== PROJECTS =====

    projects: [
      {
        title: String,
        link: String,
        description: String,
      },
    ],

    // ===== CERTIFICATIONS =====

    certs: [
      {
        name: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Developer", developerSchema);