import React, { useMemo, useState } from "react";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
// import { Eye, EyeOff } from "lucide-react";

// --- Mock catalogs --- //
const DEGREE_OPTIONS = [
  "B.Tech",
  "B.Sc",
  "M.Tech",
  "MCA",
  "BCA",
  "M.Sc",
  "Other",
];
const COLLEGE_OPTIONS = [
  "IIT Bombay",
  "IIT Delhi",
  "IIT Kanpur",
  "NIT Trichy",
  "NIT Surathkal",
  "IIIT Hyderabad",
  "Anna University",
  "Jadavpur University",
  "Delhi Technological University",
  "Other",
];
const CS_STACKS = [
  "MERN",
  "MEAN",
  "Django + React",
  "Spring Boot",
  "LAMP",
  "Flutter + Firebase",
  "DevOps (Docker/K8s)",
  "Data Science",
  "Machine Learning",
  "Android (Kotlin)",
  "iOS (Swift)",
  "Robotics",
  "Cyber Security",
  "Go Backend",
];

const DOMAIN_OPTIONS = {
  "B.Tech": ["Web Development", "AI/ML", "Cyber Security", "Data Science","Cloud Computing", "DevOps", "Full Stack"],
  // "B.Tech IT": ["Cloud Computing", "DevOps", "Full Stack"],
  "BCA": ["Web Development", "Mobile App Dev"],
  "MCA": ["AI/ML", "Software Engineering"],
  Other: ["General Tech", "Research", "Management"]
};

const SKILLS = [
  "C",
  "C++",
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "SQL",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Git",
  "HTML",
  "CSS",
  "Tailwind",
  "Next.js",
  "Redux",
  "GraphQL",
  "Firebase",
  "TensorFlow",
  "PyTorch",
];
const EXPERIENCE_OPTIONS = [
  "Fresher",
  "1+ years",
  "2+ years",
  "3+ years",
  "5+ years",
];

// Utility: simple fuzzy filter
function filterLike(list, q) {
  const s = q.trim().toLowerCase();
  if (!s) return list;
  return list.filter((x) => x.toLowerCase().includes(s));
}

function Chip({ children, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-700 border border-indigo-200">
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="-mr-1 rounded-full p-1 hover:bg-indigo-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M10 8.586 4.293 2.879 2.879 4.293 8.586 10l-5.707 5.707 1.414 1.414L10 11.414l5.707 5.707 1.414-1.414L11.414 10l5.707-5.707-1.414-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
}

function TagPicker({ label, placeholder, catalog, values, setValues }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      filterLike(
        catalog.filter((x) => !values.includes(x)),
        q
      ),
    [catalog, q, values]
  );

  function addTag(tag) {
    if (!values.includes(tag)) setValues([...values, tag]);
    setQ("");
  }
  function removeTag(tag) {
    setValues(values.filter((x) => x !== tag));
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-indigo-900">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 focus:outline-none focus:ring-4 focus:ring-indigo-200"
        />
        <button
          type="button"
          onClick={() => q && addTag(q)}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700"
        >
          + Add
        </button>
      </div>
      {filtered.length > 0 && (
        <div className="rounded-xl border border-indigo-200 p-2 max-h-36 overflow-auto bg-white">
          <p className="text-xs text-indigo-500 mb-1">Suggestions</p>
          <div className="flex flex-wrap gap-2">
            {filtered.slice(0, 12).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => addTag(t)}
                className="rounded-full border border-indigo-300 px-3 py-1 text-sm hover:bg-indigo-50"
              >
                {t} +
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {values.map((v) => (
          <Chip key={v} onRemove={() => removeTag(v)}>
            {v}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function FileField({ label, accept, value, setValue }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-indigo-900">
        {label}
      </label>
      <input
        type="file"
        accept={accept}
        onChange={(e) => setValue(e.target.files?.[0] || null)}
        className="w-full rounded-xl border border-dashed border-indigo-300 bg-indigo-50 px-3 py-8 text-center hover:bg-indigo-100 cursor-pointer"
      />
      {value && (
        <div className="text-sm text-indigo-700">
          Selected: <span className="font-medium">{value.name}</span>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-indigo-900">{title}</h3>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function Progress({ step, total }) {
  const pct = Math.round(((step + 1) / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-indigo-900">
          Step {step + 1} of {total}
        </span>
        <span className="text-sm text-indigo-700">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-indigo-100">
        <div
          className="h-2 rounded-full bg-indigo-600"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function PreviewBlock({ title, value }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-indigo-500">
        {title}
      </div>
      <div className="text-sm text-indigo-900">{value}</div>
    </div>
  );
}

export default function DeveloperChowkAuth() {
  const [role, setRole] = useState("developer");
  const [devStep, setDevStep] = useState(0);
  const [hrStep, setHrStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  // OTP mock state
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDOBChange = (e) => {
    const dob = e.target.value;
    const age = calculateAge(dob);
    setDev({ ...dev, dob, age });
  };
  // Developer form state
  const [dev, setDev] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dcPassword: "",
    dob: "",
    age: "",
    location: "",
    tenth: "",
    twelfth: "",
    degree: "",
    college: "",
    stacks: [],
    skills: [],
    activeSkills: [], // auto – initial 0%
    resume: null,
    github: "",
    lc: "",
    cf: "",
    aims: [],
    projects: [{ title: "", link: "", description: "" }],
    certs: [{ name: "", file: null }],
    domain: "",
  });

  // HR form state
  const [hr, setHr] = useState({
    companyName: "",
    yourName: "",
    email: "",
    password: "",
    phone: "",
    purpose: [], // hire / comp / both
    stacks: [],
    logo: null,
    website: "",
    description: "",
    // Hiring
    jobTitle: "",
    jobDesc: "",
    reqSkills: [],
    minExp: "",
    salary: "",
    // Competition
    compTitle: "",
    compDesc: "",
    compDomains: [],
    startDate: "",
    endDate: "",
    prizes: "",
    docs: null,
  });

  const DEV_STEPS = [
    "Basic Info",
    "Personal Details",
    "Education",
    "Technical Skills",
    "Portfolio",
    "Aims on DC",
    "Achievements / Projects",
    "Certifications",
    "Review",
  ];

  const HR_STEPS = [
    "Basic Details",
    "Purpose on DC",
    "Company Details",
    "Hiring Details",
    "Competition Details",
    "Uploads (Optional)",
    "Review",
  ];

  // Simple validators per step
  function validDevStep(i) {
    switch (i) {
      case 0:
        return (
          dev.name &&
          dev.email &&
          dev.password &&
          dev.phone &&
          dev.dcPassword &&
          otpVerified
        );
      case 1:
        return dev.age && dev.location;
      case 2:
        return dev.tenth && dev.twelfth && dev.degree && dev.college;
      case 3:
        return dev.stacks.length > 0; // at least one stack
      case 4:
        return !!dev.resume && dev.github;
      case 5:
        return dev.aims.length > 0;
      case 6:
        return dev.projects.every((p) => p.title && p.description);
      case 7:
        return true; // certifications optional
      case 8:
        return true; // review
      default:
        return false;
    }
  }

  function validHrStep(i) {
    switch (i) {
      case 0:
        return (
          hr.companyName &&
          hr.yourName &&
          hr.email &&
          hr.password &&
          hr.phone &&
          otpVerified
        );
      case 1:
        return hr.purpose.length > 0;
      case 2:
        return true; // company details optional except description maybe
      case 3:
        if (!hr.purpose.includes("Hire") && !hr.purpose.includes("Both"))
          return true;
        return (
          hr.jobTitle &&
          hr.jobDesc &&
          hr.reqSkills.length > 0 &&
          hr.minExp &&
          hr.salary
        );
      case 4:
        if (!hr.purpose.includes("Competition") && !hr.purpose.includes("Both"))
          return true;
        return (
          hr.compTitle &&
          hr.compDesc &&
          hr.compDomains.length > 0 &&
          hr.startDate &&
          hr.endDate
        );
      case 5:
        return true; // uploads optional
      case 6:
        return true; // review
      default:
        return false;
    }
  }

  // OTP mock handlers
  function sendOtp() {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(code);
    setOtpSent(true);
    setOtpVerified(false);
    alert(`Mock OTP sent: ${code}`); // Replace with real SMS in production
  }
  function verifyOtp() {
    if (otpInput === otpCode) {
      setOtpVerified(true);
      alert("Phone verified!");
    } else {
      setOtpVerified(false);
      alert("Invalid OTP. Try again.");
    }
  }

  const activeSteps = role === "developer" ? DEV_STEPS : HR_STEPS;
  const currentStep = role === "developer" ? devStep : hrStep;
  const canContinue =
    role === "developer" ? validDevStep(currentStep) : validHrStep(currentStep);

  function toggleAim(value) {
    setDev((d) => ({
      ...d,
      aims: d.aims.includes(value)
        ? d.aims.filter((x) => x !== value)
        : [...d.aims, value],
    }));
  }
  function togglePurpose(value) {
    setHr((h) => ({
      ...h,
      purpose: h.purpose.includes(value)
        ? h.purpose.filter((x) => x !== value)
        : [...h.purpose, value],
    }));
  }

  function submitAll() {
    // Save logged in user to localStorage
    localStorage.setItem(
      "dcUser",
      JSON.stringify({
        name: dev.name,
        email: dev.email,
        role: role,
      })
    );

    setSubmitted(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Dashboards (simple)
  if (submitted && role === "developer") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

        {/* ===== HEADER ===== */}
        <div className="max-w-6xl mx-auto px-6 pt-10">

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-indigo-100">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              {/* Profile Info */}
              <div>
                <h1 className="text-3xl font-bold text-indigo-900">
                  {dev.name}
                </h1>

                <p className="text-indigo-600">{dev.location}</p>

                {/* NEW INFO SECTION */}
                <div className="mt-3 space-y-1 text-sm text-gray-700">
                  {dev.email && (
                    <p>📧 {dev.email}</p>
                  )}
                  {dev.mobile && (
                    <p>📱 {dev.mobile}</p>
                  )}
                  {dev.college && (
                    <p>🎓 {dev.college}</p>
                  )}
                </div>

                {/* SOCIAL LINKS */}
                <div className="flex flex-wrap gap-3 mt-3 text-sm">
                  {dev.github && (
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      GitHub
                    </a>
                  )}

                  {dev.lc && (
                    <a
                      href={dev.lc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      LeetCode
                    </a>
                  )}

                  {dev.linkedin && (
                    <a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
              {/* Resume Badge */}
              {dev.resume && (
                <div className="bg-indigo-50 px-6 py-4 rounded-2xl border border-indigo-100 text-center">
                  <div className="text-indigo-600 text-sm">Resume</div>
                  <div className="font-semibold text-indigo-900 text-sm">
                    {dev.resume.name}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ===== MAIN GRID ===== */}
          <div className="grid lg:grid-cols-3 gap-8 mt-10">

            {/* LEFT - SKILLS */}
            <div className="lg:col-span-2 space-y-8">

              {/* Skill Progress */}
              <div className="bg-white rounded-3xl shadow-md p-8 border border-indigo-100">
                <h2 className="text-xl font-bold text-indigo-900 mb-6">
                  🧠 Skill Progress
                </h2>

                <div className="space-y-5">
                  {(dev.skills.length ? dev.skills : ["JavaScript", "React"])
                    .slice(0, 6)
                    .map((skill, i) => {
                      const percent = 0;
                      return (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-indigo-700">
                              {skill}
                            </span>
                            <span className="text-indigo-600">{percent}%</span>
                          </div>
                          <div className="h-3 rounded-full bg-indigo-100 overflow-hidden">
                            <div
                              className="h-3 bg-gradient-to-r from-indigo-500 to-purple-500"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Projects */}
              <div className="bg-white rounded-3xl shadow-md p-8 border border-indigo-100">
                <h2 className="text-xl font-bold text-indigo-900 mb-6">
                  📂 Projects
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {dev.projects.map((p, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-6 border border-indigo-100 bg-indigo-50 hover:shadow-lg transition"
                    >
                      <h3 className="font-semibold text-indigo-800 mb-2">
                        {p.title}
                      </h3>
                      <p className="text-sm text-indigo-700 mb-3 line-clamp-3">
                        {p.description}
                      </p>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          className="text-indigo-600 text-sm font-medium hover:underline"
                        >
                          🔗 View Project
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT - STACKS + STATS */}
            <div className="space-y-8">

              {/* Tech Stacks */}
              <div className="bg-white rounded-3xl shadow-md p-8 border border-indigo-100">
                <h2 className="text-xl font-bold text-indigo-900 mb-4">
                  💻 Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {dev.stacks.map((stack, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl shadow-xl p-8">
                <h2 className="text-xl font-bold mb-4">📊 Developer Stats</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Projects</span>
                    <span>{dev.projects.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Skills</span>
                    <span>{dev.skills.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stacks</span>
                    <span>{dev.stacks.length}</span>
                  </div>
                </div>
              </div>

              {/* Aims */}
              <div className="bg-white rounded-3xl shadow-md p-8 border border-indigo-100">
                <h2 className="text-xl font-bold text-indigo-900 mb-4">
                  🎯 Goals on DC
                </h2>
                <div className="flex flex-wrap gap-2">
                  {dev.aims.map((aim, i) => (
                    <span
                      key={i}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                    >
                      {aim}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/watermark2.jpg')" }}
    >
      <header className="mx-auto max-w-5xl px-4 py-6 mt-20 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-indigo-600 grid place-content-center text-white font-bold">
              DC
            </div>
            <h1 className="text-2xl font-bold text-indigo-900">
              Developer Chowk
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setRole("developer");
                setOtpVerified(false);
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium border ${role === "developer"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                }`}
            >
              Developer
            </button>
            <button
              onClick={() => {
                setRole("hr");
                setOtpVerified(false);
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium border ${role === "hr"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                }`}
            >
              Industry Expert
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24">
        <div className="rounded-3xl border border-indigo-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <Progress step={currentStep} total={activeSteps.length} />
          </div>

          {role === "developer" ? (
            <div className="grid gap-6">
              {devStep === 0 && (
                <Section title="Basic Info">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Full Name
                      </label>
                      <input
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={dev.name}
                        onChange={(e) =>
                          setDev({ ...dev, name: e.target.value })
                        }
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className={`w-full rounded-xl border px-3 py-2 ${dev.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dev.email)
                          ? "border-red-500"
                          : "border-indigo-200"
                          }`}
                        value={dev.email}
                        onChange={(e) => setDev({ ...dev, email: e.target.value })}
                        placeholder="Enter your email address"
                      />
                      {dev.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dev.email) && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a valid email address
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Password
                      </label>

                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          className={`w-full rounded-xl border px-3 py-2 pr-10 ${dev.password &&
                            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(dev.password)
                            ? "border-red-500"
                            : "border-indigo-200"
                            }`}
                          value={dev.password}
                          onChange={(e) => setDev({ ...dev, password: e.target.value })}
                          placeholder="Enter your password"
                        />

                        {/* Eye icon button */}
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>

                      {/* Validation message */}
                      {dev.password &&
                        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(dev.password) && (
                          <p className="text-red-500 text-sm mt-1">
                            Password must be at least 8 characters long, include 1 uppercase
                            letter, 1 lowercase letter, and 1 special character.
                          </p>
                        )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Phone Number
                      </label>

                      <div className="flex gap-2">
                        <input
                          type="tel"
                          className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                          value={dev.phone}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Allow only digits and up to 10 characters
                            if (/^\d{0,10}$/.test(value)) {
                              setDev({ ...dev, phone: value });
                            }
                          }}
                          maxLength={10}
                          placeholder="Enter 10-digit number"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            if (dev.phone.length === 10) {
                              sendOtp();
                            }
                          }}
                          disabled={dev.phone.length !== 10}
                          className={`rounded-xl px-4 py-2 text-white ${dev.phone.length === 10
                            ? "bg-indigo-600 hover:bg-indigo-700"
                            : "bg-indigo-300 cursor-not-allowed"
                            }`}
                        >
                          Send OTP
                        </button>
                      </div>

                      {/* Optional validation message */}
                      {dev.phone.length > 0 && dev.phone.length < 10 && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a valid 10-digit phone number
                        </p>
                      )}

                      {otpSent && (
                        <div className="mt-2 flex gap-2">
                          <input
                            placeholder="Enter OTP"
                            className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                            value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={verifyOtp}
                            className="rounded-xl bg-white px-4 py-2 text-indigo-700 border border-indigo-200 hover:bg-indigo-50"
                          >
                            Verify
                          </button>

                          {otpVerified && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-green-700 text-sm">
                              Verified
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Create DC Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={dev.dcPassword}
                        onChange={(e) =>
                          setDev({ ...dev, dcPassword: e.target.value })
                        }
                        placeholder="Enter your DC password"
                      />
                    </div>
                  </div>
                </Section>
              )}

              {devStep === 1 && (
                <Section title="Personal Details">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={dev.dob}
                        onChange={handleDOBChange}
                      />
                      {dev.age && (
                        <p className="mt-2 text-gray-700">Age: {dev.age} years</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Location
                      </label>
                      <input
                        placeholder="City, State"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={dev.location}
                        onChange={(e) =>
                          setDev({ ...dev, location: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </Section>
              )}

              {devStep === 2 && (
                <Section title="Education">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        10th Marks (%)
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={dev.tenth}
                        onChange={(e) =>
                          setDev({ ...dev, tenth: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        12th Marks (%)
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={dev.twelfth}
                        onChange={(e) =>
                          setDev({ ...dev, twelfth: e.target.value })
                        }
                      />
                    </div>
                    {/* DEGREE + DOMAIN (Same Column) */}
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Degree
                      </label>

                      <select
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={dev.degree}
                        onChange={(e) =>
                          setDev({ ...dev, degree: e.target.value, domain: "" }) // reset domain when degree changes
                        }
                      >
                        <option value="">Select Degree</option>
                        {DEGREE_OPTIONS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                        <option value="Other">Other</option>
                      </select>

                      {/* Other Degree Input */}
                      {dev.degree === "Other" && (
                        <input
                          type="text"
                          placeholder="Enter your degree"
                          className="mt-3 w-full rounded-xl border border-indigo-200 px-3 py-2"
                          value={dev.otherDegree || ""}
                          onChange={(e) =>
                            setDev({ ...dev, otherDegree: e.target.value })
                          }
                        />
                      )}

                      {/* DOMAIN DROPDOWN */}
                      {dev.degree && (
                        <div className="mt-3">
                          <label className="block text-sm font-medium text-indigo-900">
                            Domain
                          </label>

                          <select
                            className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                            value={dev.domain}
                            onChange={(e) =>
                              setDev({ ...dev, domain: e.target.value })
                            }
                          >
                            <option value="">Select Domain</option>
                            {(DOMAIN_OPTIONS[dev.degree] || []).map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* COLLEGE - New Row */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-indigo-900">
                        College
                      </label>

                      <select
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={dev.college}
                        onChange={(e) =>
                          setDev({ ...dev, college: e.target.value })
                        }
                      >
                        <option value="">Select College</option>
                        {COLLEGE_OPTIONS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                        <option value="Other">Other</option>
                      </select>

                      {dev.college === "Other" && (
                        <input
                          type="text"
                          placeholder="Enter your college name"
                          className="mt-3 w-full rounded-xl border border-indigo-200 px-3 py-2"
                          value={dev.otherCollege || ""}
                          onChange={(e) =>
                            setDev({ ...dev, otherCollege: e.target.value })
                          }
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        University CGPA
                      </label>

                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        placeholder="Enter your CGPA (0 - 10)"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={dev.cgpa || ""}
                        onChange={(e) => {
                          const value = e.target.value;

                          // Allow only valid CGPA between 0 and 10
                          if (value === "" || (Number(value) >= 0 && Number(value) <= 10)) {
                            setDev({ ...dev, cgpa: value });
                          }
                        }}
                      />

                      {dev.cgpa && (Number(dev.cgpa) < 0 || Number(dev.cgpa) > 10) && (
                        <p className="text-red-500 text-sm mt-1">
                          CGPA must be between 0 and 10
                        </p>
                      )}
                    </div>

                  </div>
                </Section>
              )}

              {devStep === 3 && (
                <Section title="Technical Skills">
                  <TagPicker
                    label="Stack for Computer Science"
                    placeholder="Search a stack (e.g., MERN)"
                    catalog={CS_STACKS}
                    values={dev.stacks}
                    setValues={(v) => setDev({ ...dev, stacks: v })}
                  />
                  <TagPicker
                    label="Mentioned Skills"
                    placeholder="Search skills (e.g., React)"
                    catalog={SKILLS}
                    values={dev.skills}
                    setValues={(v) => setDev({ ...dev, skills: v })}
                  />
                  <div className="text-sm text-indigo-700">
                    Active skills will be auto-filled later. They start at{" "}
                    <span className="font-semibold">0%</span> and increase with
                    your activity.
                  </div>
                </Section>
              )}

              {devStep === 4 && (
                <Section title="Portfolio">
                  <div className="grid md:grid-cols-2 gap-4">

                    {/* Resume Upload */}
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Upload Resume (PDF / DOC / DOCX)
                      </label>

                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const validTypes = [
                                "application/pdf",
                                "application/msword",
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                              ];

                              if (validTypes.includes(file.type)) {
                                setDev({ ...dev, resume: file });
                              } else {
                                alert("Only PDF or DOC/DOCX files are allowed");
                              }
                            }
                          }}
                        />

                        {/* Remove Resume Button */}
                        {dev.resume && (
                          <button
                            type="button"
                            onClick={() => setDev({ ...dev, resume: null })}
                            className="text-red-500 text-xl font-bold"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {dev.resume && (
                        <p className="text-sm text-green-600 mt-1">
                          {dev.resume.name}
                        </p>
                      )}
                    </div>

                    {/* Links Section */}
                    <div>
                      {/* GitHub */}
                      <label className="block text-sm font-medium text-indigo-900">
                        GitHub Link
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/username"
                        pattern="https?://.+"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={dev.github}
                        onChange={(e) =>
                          setDev({ ...dev, github: e.target.value })
                        }
                      />

                      {/* LinkedIn */}
                      <label className="block text-sm font-medium text-indigo-900 mt-4">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        pattern="https?://.+"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={dev.linkedin}
                        onChange={(e) =>
                          setDev({ ...dev, linkedin: e.target.value })
                        }
                      />

                      {/* Personal Portfolio (Optional) */}
                      <label className="block text-sm font-medium text-indigo-900 mt-4">
                        Personal Portfolio (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://yourportfolio.com"
                        pattern="https?://.+"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={dev.portfolio}
                        onChange={(e) =>
                          setDev({ ...dev, portfolio: e.target.value })
                        }
                      />

                      {/* Competitive Profiles */}
                      <div className="mt-4 grid md:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-indigo-900">
                            LeetCode Profile
                          </label>
                          <input
                            type="url"
                            placeholder="https://leetcode.com/username"
                            pattern="https?://.+"
                            className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                            value={dev.lc}
                            onChange={(e) =>
                              setDev({ ...dev, lc: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-indigo-900">
                            Codeforces Profile <span className="text-gray-500">(Optional)</span>
                          </label>

                          <input
                            type="url"
                            placeholder="https://codeforces.com/profile/handle"
                            className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                            value={dev.cf}
                            onChange={(e) =>
                              setDev({ ...dev, cf: e.target.value })
                            }
                          />

                          {/* Show error only if user types something invalid */}
                          {dev.cf && !/^https?:\/\/.+/.test(dev.cf) && (
                            <p className="text-red-500 text-sm mt-1">
                              Please enter a valid URL (must start with http or https)
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Section>
              )}

              {devStep === 5 && (
                <Section title="Aim on Developer Chowk (choose any)">
                  <div className="grid md:grid-cols-2 gap-2">
                    {[
                      "Post Projects",
                      "Collaborate",
                      "Earn Money",
                      "Use Every Feature",
                    ].map((a) => (
                      <label
                        key={a}
                        className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2"
                      >
                        <input
                          type="checkbox"
                          checked={dev.aims.includes(a)}
                          onChange={() => toggleAim(a)}
                        />
                        <span className="text-indigo-900">{a}</span>
                      </label>
                    ))}
                  </div>
                  <div className="text-sm text-indigo-700">
                    These choices will customize the suggestions on your home
                    page.
                  </div>
                </Section>
              )}

              {devStep === 6 && (
                <Section title="Achievements & Projects">
                  <div className="space-y-4">
                    {dev.projects.map((p, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-indigo-200 p-4 grid gap-3"
                      >
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-indigo-900">
                              Project Title
                            </label>
                            <input
                              className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                              value={p.title}
                              onChange={(e) => {
                                const arr = [...dev.projects];
                                arr[idx].title = e.target.value;
                                setDev({ ...dev, projects: arr });
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-indigo-900">
                              Project Link
                            </label>
                            <input
                              placeholder="https://..."
                              className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                              value={p.link}
                              onChange={(e) => {
                                const arr = [...dev.projects];
                                arr[idx].link = e.target.value;
                                setDev({ ...dev, projects: arr });
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-indigo-900">
                            Description
                          </label>
                          <textarea
                            rows={3}
                            className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                            value={p.description}
                            onChange={(e) => {
                              const arr = [...dev.projects];
                              arr[idx].description = e.target.value;
                              setDev({ ...dev, projects: arr });
                            }}
                          />
                        </div>
                        <div className="flex justify-end">
                          {dev.projects.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                setDev({
                                  ...dev,
                                  projects: dev.projects.filter(
                                    (_, i) => i !== idx
                                  ),
                                })
                              }
                              className="rounded-xl border border-indigo-200 px-4 py-2 text-indigo-700 hover:bg-indigo-50"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setDev({
                          ...dev,
                          projects: [
                            ...dev.projects,
                            { title: "", link: "", description: "" },
                          ],
                        })
                      }
                      className="rounded-xl bg-white px-4 py-2 text-indigo-700 border border-indigo-200 hover:bg-indigo-50"
                    >
                      + Add another project
                    </button>
                  </div>
                </Section>
              )}

              {devStep === 7 && (
                <Section title="Certifications">
                  <div className="space-y-4">
                    {dev.certs.map((c, idx) => (
                      <div
                        key={idx}
                        className="space-y-3 p-4 rounded-xl border border-indigo-200 bg-indigo-50"
                      >
                        {/* Certification Name */}
                        <input
                          placeholder="Certification name"
                          className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                          value={c.name}
                          onChange={(e) => {
                            const arr = [...dev.certs];
                            arr[idx].name = e.target.value;
                            setDev({ ...dev, certs: arr });
                          }}
                        />

                        {/* Upload Certificate */}
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="w-full rounded-xl border border-indigo-200 px-3 py-2 bg-white"
                          onChange={(e) => {
                            const arr = [...dev.certs];
                            arr[idx].file = e.target.files[0];
                            setDev({ ...dev, certs: arr });
                          }}
                        />

                        {/* Show selected file name */}
                        {c.file && (
                          <p className="text-sm text-green-600">
                            Uploaded: {c.file.name}
                          </p>
                        )}

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setDev({
                              ...dev,
                              certs: dev.certs.filter((_, i) => i !== idx),
                            })
                          }
                          className="rounded-xl border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}

                    {/* Add Certification */}
                    <button
                      type="button"
                      onClick={() =>
                        setDev({
                          ...dev,
                          certs: [...dev.certs, { name: "", file: null }],
                        })
                      }
                      className="rounded-xl bg-white px-4 py-2 text-indigo-700 border border-indigo-200 hover:bg-indigo-50"
                    >
                      + Add certification
                    </button>
                  </div>
                </Section>
              )}

              {devStep === 8 && (
                <Section title="🚀 Profile Review">
                  <div className="space-y-8">

                    {/* ===== Profile Header ===== */}
                    <div className="flex items-center gap-6 bg-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-sm">
                      <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                        {dev.name?.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-indigo-900">{dev.name}</h2>
                        <p className="text-sm text-indigo-600">{dev.email}</p>
                        <p className="text-sm text-indigo-600">{dev.location}</p>
                      </div>
                    </div>

                    {/* ===== Main Grid ===== */}
                    <div className="grid md:grid-cols-2 gap-6">

                      {/* LEFT SIDE */}
                      <div className="bg-white rounded-2xl shadow-md p-6 border border-indigo-100 space-y-4">
                        <h3 className="text-lg font-semibold text-indigo-700">
                          📌 Personal Information
                        </h3>

                        <PreviewBlock title="Phone" value={dev.phone} />
                        <PreviewBlock title="Age" value={dev.age} />
                        <PreviewBlock
                          title="Education"
                          value={`${dev.degree} @ ${dev.college}`}
                        />
                        <PreviewBlock
                          title="10th / 12th"
                          value={`${dev.tenth}% / ${dev.twelfth}%`}
                        />

                        <div>
                          <div className="text-sm font-medium text-indigo-600 mb-2">
                            💻 Tech Stacks
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {dev.stacks.map((stack, i) => (
                              <span
                                key={i}
                                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
                              >
                                {stack}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium text-indigo-600 mb-2">
                            ⚡ Skills
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {dev.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="bg-white rounded-2xl shadow-md p-6 border border-indigo-100 space-y-4">
                        <h3 className="text-lg font-semibold text-indigo-700">
                          🌐 Professional Links
                        </h3>

                        <PreviewBlock title="GitHub" value={dev.github} />
                        <PreviewBlock title="LeetCode" value={dev.lc} />
                        <PreviewBlock title="Codeforces" value={dev.cf} />

                        <div>
                          <div className="text-sm font-medium text-indigo-600 mb-2">
                            🎯 Aims
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {dev.aims.map((aim, i) => (
                              <span
                                key={i}
                                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
                              >
                                {aim}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Projects Card Style */}
                        <div>
                          <div className="text-sm font-medium text-indigo-600 mb-2">
                            📂 Projects
                          </div>
                          <div className="space-y-3">
                            {dev.projects.map((p, i) => (
                              <div
                                key={i}
                                className="p-4 rounded-xl border border-indigo-100 bg-indigo-50 hover:shadow-md transition"
                              >
                                <div className="font-semibold text-indigo-800">
                                  {p.title}
                                </div>
                                {p.link && (
                                  <a
                                    href={p.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-indigo-600 hover:underline"
                                  >
                                    🔗 View Project
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium text-indigo-600 mb-2">
                            🎓 Certifications
                          </div>

                          <div className="space-y-3">
                            {dev.certs
                              .filter((c) => c.name)
                              .map((c, i) => (
                                <div
                                  key={i}
                                  className="p-4 rounded-xl border border-indigo-100 bg-indigo-50"
                                >
                                  <div className="font-semibold text-indigo-800">
                                    {c.name}
                                  </div>

                                  {c.file && (
                                    <div className="text-sm text-green-600 mt-1">
                                      📄 {c.file.name}
                                    </div>
                                  )}
                                </div>
                              ))}

                            {dev.certs.filter((c) => c.name).length === 0 && (
                              <p className="text-sm text-gray-400">No certifications added</p>
                            )}
                          </div>
                        </div>

                        {dev.resume && (
                          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                            <div className="text-sm font-medium text-indigo-600">
                              📄 Resume Uploaded
                            </div>
                            <div className="text-sm text-indigo-800 font-medium">
                              {dev.resume.name}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Section>
              )}

              <div className="flex justify-between mt-8">
                <button
                  disabled={devStep === 0}
                  onClick={() => setDevStep((s) => Math.max(0, s - 1))}
                  className={`rounded-xl px-5 py-2 font-medium transition-all duration-200 ${devStep === 0
                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                    : "bg-white border border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                    }`}
                >
                  ← Back
                </button>

                {devStep < DEV_STEPS.length - 1 ? (
                  <button
                    disabled={!canContinue}
                    onClick={() =>
                      setDevStep((s) => Math.min(DEV_STEPS.length - 1, s + 1))
                    }
                    className={`rounded-xl px-6 py-2 font-semibold text-white transition-all duration-200 ${canContinue
                      ? "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
                      : "bg-indigo-300"
                      }`}
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    onClick={submitAll}
                    className="rounded-xl px-8 py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition-transform shadow-lg"
                  >
                    🚀 Submit & Create Developer Account
                  </button>
                )}
              </div>
            </div>
          ) : (


            // --- HR FLOW --- //
            <div className="grid gap-6">
              {hrStep === 0 && (
                <Section title="Basic Details">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Company Name
                      </label>
                      <input
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.companyName}
                        onChange={(e) =>
                          setHr({ ...hr, companyName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Your Name
                      </label>
                      <input
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.yourName}
                        onChange={(e) =>
                          setHr({ ...hr, yourName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Official Email
                      </label>
                      <input
                        type="email"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.email}
                        onChange={(e) =>
                          setHr({ ...hr, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.password}
                        onChange={(e) =>
                          setHr({ ...hr, password: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-indigo-900">
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        <input
                          className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                          value={hr.phone}
                          onChange={(e) =>
                            setHr({ ...hr, phone: e.target.value })
                          }
                        />
                        <button
                          type="button"
                          onClick={sendOtp}
                          className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                        >
                          Send OTP
                        </button>
                      </div>
                      {otpSent && (
                        <div className="mt-2 flex gap-2">
                          <input
                            placeholder="Enter OTP"
                            className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                            value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={verifyOtp}
                            className="rounded-xl bg-white px-4 py-2 text-indigo-700 border border-indigo-200 hover:bg-indigo-50"
                          >
                            Verify
                          </button>
                          {otpVerified && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-green-700 text-sm">
                              Verified
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Section>
              )}

              {hrStep === 1 && (
                <Section title="Purpose on Developer Chowk">
                  <div className="grid md:grid-cols-3 gap-3">
                    {["Hire", "Competition", "Both"].map((p) => (
                      <label
                        key={p}
                        className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2"
                      >
                        <input
                          type="checkbox"
                          checked={hr.purpose.includes(p)}
                          onChange={() => togglePurpose(p)}
                        />
                        <span className="text-indigo-900">
                          {p === "Hire"
                            ? "Want to Hire People"
                            : p === "Competition"
                              ? "Want to Run a Competition"
                              : "Both"}
                        </span>
                      </label>
                    ))}
                  </div>
                  <TagPicker
                    label="Tech Stack of Candidates Wanted"
                    placeholder="e.g., React, Node.js"
                    catalog={SKILLS}
                    values={hr.stacks}
                    setValues={(v) => setHr({ ...hr, stacks: v })}
                  />
                </Section>
              )}

              {hrStep === 2 && (
                <Section title="Company Details">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FileField
                      label="Company Logo (PNG/JPG)"
                      accept="image/*"
                      value={hr.logo}
                      setValue={(f) => setHr({ ...hr, logo: f })}
                    />
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Company Website
                      </label>
                      <input
                        placeholder="https://company.com"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.website}
                        onChange={(e) =>
                          setHr({ ...hr, website: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-indigo-900">
                        Company Description
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.description}
                        onChange={(e) =>
                          setHr({ ...hr, description: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </Section>
              )}

              {hrStep === 3 && (
                <Section title="Hiring Details (shown if 'Hire' or 'Both')">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Job Title
                      </label>
                      <input
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.jobTitle}
                        onChange={(e) =>
                          setHr({ ...hr, jobTitle: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Min Experience
                      </label>
                      <select
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.minExp}
                        onChange={(e) =>
                          setHr({ ...hr, minExp: e.target.value })
                        }
                      >
                        <option value="">Select</option>
                        {EXPERIENCE_OPTIONS.map((x) => (
                          <option key={x} value={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-indigo-900">
                        Job Description
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.jobDesc}
                        onChange={(e) =>
                          setHr({ ...hr, jobDesc: e.target.value })
                        }
                      />
                    </div>
                    <TagPicker
                      label="Required Skills"
                      placeholder="e.g., React, Node.js"
                      catalog={SKILLS}
                      values={hr.reqSkills}
                      setValues={(v) => setHr({ ...hr, reqSkills: v })}
                    />
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Salary Range
                      </label>
                      <input
                        placeholder="e.g., ₹8–12 LPA"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.salary}
                        onChange={(e) =>
                          setHr({ ...hr, salary: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </Section>
              )}

              {hrStep === 4 && (
                <Section title="Competition Details (shown if 'Competition' or 'Both')">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Competition Title
                      </label>
                      <input
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.compTitle}
                        onChange={(e) =>
                          setHr({ ...hr, compTitle: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Tech Domains
                      </label>
                      <TagPicker
                        label="Add Domains"
                        placeholder="e.g., AI, Web, Cloud"
                        catalog={[
                          ...new Set([
                            "AI",
                            "Web",
                            "Cloud",
                            "Security",
                            "Mobile",
                            "Data Science",
                            "DevOps",
                            "Open Source",
                          ]),
                        ]}
                        values={hr.compDomains}
                        setValues={(v) => setHr({ ...hr, compDomains: v })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.startDate}
                        onChange={(e) =>
                          setHr({ ...hr, startDate: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-900">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.endDate}
                        onChange={(e) =>
                          setHr({ ...hr, endDate: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-indigo-900">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.compDesc}
                        onChange={(e) =>
                          setHr({ ...hr, compDesc: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-indigo-900">
                        Prizes & Rewards
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded-xl border border-indigo-200 px-3 py-2"
                        value={hr.prizes}
                        onChange={(e) =>
                          setHr({ ...hr, prizes: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </Section>
              )}

              {hrStep === 5 && (
                <Section title="Upload Documents (Optional)">
                  <FileField
                    label="PDF / Images"
                    accept=".pdf,image/*"
                    value={hr.docs}
                    setValue={(f) => setHr({ ...hr, docs: f })}
                  />
                </Section>
              )}

              {hrStep === 6 && (
                <Section title="Profile Review">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <PreviewBlock title="Company" value={hr.companyName} />
                      <PreviewBlock
                        title="Contact Person"
                        value={hr.yourName}
                      />
                      <PreviewBlock title="Email" value={hr.email} />
                      <PreviewBlock title="Phone" value={hr.phone} />
                      <PreviewBlock
                        title="Purpose"
                        value={hr.purpose.join(", ")}
                      />
                      <PreviewBlock
                        title="Stacks Wanted"
                        value={hr.stacks.join(", ")}
                      />
                    </div>
                    <div className="space-y-3">
                      <PreviewBlock title="Website" value={hr.website} />
                      <PreviewBlock
                        title="Description"
                        value={hr.description}
                      />
                      <PreviewBlock title="Job Title" value={hr.jobTitle} />
                      <PreviewBlock
                        title="Required Skills"
                        value={hr.reqSkills.join(", ")}
                      />
                      <PreviewBlock title="Salary" value={hr.salary} />
                      <PreviewBlock
                        title="Competition"
                        value={
                          hr.compTitle
                            ? `${hr.compTitle} (${hr.startDate} → ${hr.endDate})`
                            : "—"
                        }
                      />
                    </div>
                  </div>
                </Section>
              )}

              <div className="flex justify-between">
                <button
                  disabled={hrStep === 0}
                  onClick={() => setHrStep((s) => Math.max(0, s - 1))}
                  className={`rounded-xl px-4 py-2 font-medium border ${hrStep === 0
                    ? "opacity-50 cursor-not-allowed border-indigo-200 text-indigo-300"
                    : "text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                    }`}
                >
                  Back
                </button>
                {hrStep < HR_STEPS.length - 1 ? (
                  <button
                    disabled={!canContinue}
                    onClick={() =>
                      setHrStep((s) => Math.min(HR_STEPS.length - 1, s + 1))
                    }
                    className={`rounded-xl px-6 py-2 font-semibold text-white ${canContinue
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-indigo-300"
                      }`}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={submitAll}
                    className="rounded-xl px-6 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Submit & Create HR/Organization Account
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>


    </div>
  );
}