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

      // EDUCATION
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
      aims,

      // LINKS
      github,
      linkedin,
      resumeLink,
      portfolio,
      lc,
      cf,

      // PROJECTS & CERTS
      projects,
      certs,

    } = req.body;

    // CHECK EXISTING USER
    const existingUser = await Developer.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
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
      actualDegree,

      degreeDomain,
      actualDomain,

      college,
      actualCollegeName,

      cgpa,

      stacks,
      skills,
      aims,

      github,
      linkedin,
      resumeLink,
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