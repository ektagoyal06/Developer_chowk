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

    tenth: Number,

    twelfth: Number,

    degree: String,

    college: String,

    cgpa: Number,

    stacks: [String],

    skills: [String],

    github: String,

    linkedin: String,

    portfolio: String,

    lc: String,

    cf: String,

    projects: [
      {
        title: String,
        link: String,
        description: String,
      },
    ],

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