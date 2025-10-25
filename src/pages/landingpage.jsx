import { useState } from "react";
import { Menu, X, Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleTheme = () => setDarkMode(!darkMode);

  const slides = [
    {
      title: "Empowering Developers & Experts – All in One Platform",
      desc: "Find projects, collaborate with passionate minds, get freelance gigs, and solve bugs for rewards.",
      img: "/developer.png",
    },
    {
      title: "Looking for a Teammate?",
      desc: "Search developers by skills & location. Get AI suggestions for best teammate match.",
      img: "/teammate.png", // ✅ path from public folder
    },

    {
      title: "Become the top freelancer – Work. Earn. Grow.",
      desc: "Browse freelance gigs, track payments & climb the leaderboard.",
      img: "https://illustrations.popsy.co/gray/freelancer.svg",
    },
  ];

  return (
    <div
      className={
        darkMode
          ? "dark bg-gray-950 text-white"
          : "bg-white text-gray-900"
      }
    >
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-950 shadow-lg z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a
            href="#"
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
          >
            DevChowk
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-900 dark:text-white">
            {/* Features Dropdown */}
            <div className="relative group">
              <button className="transition text-gray-900 dark:text-white hover:text-blue-500">
                Features
              </button>

              {/* Dropdown Content */}
              <div className="absolute left-0 top-full hidden group-hover:block p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[200px] z-20">
                <a href="#" className="flex items-center space-x-2 mb-2 hover:text-blue-500">
                  <span>📝</span> <span>Projects Arena</span>
                </a>
                <a href="#" className="flex items-center space-x-2 mb-2 hover:text-blue-500">
                  <span>🔄</span> <span>TeamHive</span>
                </a>
                <a href="#" className="flex items-center space-x-2 mb-2 hover:text-blue-500">
                  <span>⚡</span> <span>CollabHub</span>
                </a>
                <a href="#" className="flex items-center space-x-2 mb-2 hover:text-blue-500">
                  <span>🛡️</span> <span>BugBounty</span>
                </a>
                <a href="#" className="flex items-center space-x-2 mb-2 hover:text-blue-500">
                  <span>📄</span> <span>ProLance</span>
                </a>
                <a href="#" className="flex items-center space-x-2 mb-2 hover:text-blue-500">
                  <span>📚</span> <span>ProjMart</span>
                </a>
              </div>
            </div>

            <a href="#whyus" className="relative group">
              About Us
              <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-blue-500 transition-all"></span>
            </a>

            {/* Sign Up / Login Dropdown */}
            <div className="relative group">
              <button className="transition text-gray-900 dark:text-white hover:text-blue-500">
                Sign Up / Login
              </button>

              <div className="absolute left-0 top-full  hidden group-hover:block bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden z-20">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-800"
                >
                  As Developer
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-800"
                >
                  As Industry Expert
                </a>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-110 transition-transform text-gray-900 dark:text-white"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white dark:bg-gray-950 px-6 pb-4 space-y-3 shadow-lg"
          >
            <a href="#features" className="block hover:text-blue-500">
              Features
            </a>
            <a href="#whyus" className="block hover:text-blue-500">
              Why Us
            </a>
            <a href="#" className="block hover:text-blue-500">
              As Developer
            </a>
            <a href="#" className="block hover:text-blue-500">
              As HR / Recruiter
            </a>
          </motion.div>
        )}
      </header>

      {/* Hero Section with Carousel */}
      <section className="pt-28 md:pt-36 pb-20 px-6 max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              {slides[currentSlide].title}
            </h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 max-w-lg font-bold">
              {slides[currentSlide].desc}
            </p>
            <div className="space-x-4">
              <a
                href="#"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:scale-105 transition-transform"
              >
                Join Now
              </a>
              <a
                href="#features"
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-500 font-bold transition"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img
              src={slides[currentSlide].img}
              alt="Hero"
              className="w-[40rem] drop-shadow-2xl h-[34rem] rounded-2xl"
            />
          </motion.div>
        </div>

        {/* Controls */}
        {/* Left Control */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute -left-12 top-1/2 -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute -right-7 top-1/2 -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full"
        >
          <ChevronRight />
        </button>


        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full ${i === currentSlide ? "bg-blue-600" : "bg-gray-400"
                }`}
            />
          ))}
        </div>
      </section>

      {/* Join Community */}
      <section
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"
        id="community"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12 px-6"
        >
          {/* Left Side - Image */}
          <div className="flex justify-start">
            <img
              src="/community.png" // place your image in /public folder
              alt="Community"
              className="w-83 h-80 drop-shadow-xl rounded-2xl"
            />
          </div>

          {/* Right Side - Text */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">
              A Thriving Network of Coders & Innovators
            </h2>
            <p className="mb-8 text-gray-600 dark:text-gray-300 max-w-xl">
              Connect with like-minded developers, share ideas, and grow together.
            </p>

            <a
              href="#"
              className="mt-6 inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              Join the Community
            </a>
          </div>
        </motion.div>
      </section>

      {/* Find Teammate */}
      <section className="py-10 px-6 max-w-6xl mx-auto text-center" id="findmate">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold mb-6"
        >
          Looking for a Teammate?
        </motion.h2>

        <p className="text-gray-600 dark:text-black-300 font-bold mb-12 max-w-xl mx-auto">
          Search developers by skills & location. Get AI suggestions for best teammate match.
        </p>

        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          src="/teammate.png"   // ✅ directly from public
          alt="Teammates"
          className="mx-auto w-85 h-80 mb-8 rounded-2xl"
        />

        {/* Button added here */}
        <a
          href="#"
          className="inline-block mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          Teamhive here
        </a>
      </section>


      {/* Open to Work Section */}
      <section
        className="py-20 px-6 max-w-8xl mx-auto grid md:grid-cols-2 gap-x-6 gap-y-12 items-center bg-gradient-to-br from-[#161C2D] to-[#0B0F1C]"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="pl-12 md:order-1" // Increased left padding to shift text more right
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
            Let the right developer know you’re open to discover !!!
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            With the <span className="font-semibold text-white">Open To Work</span> feature,
            you can privately tell recruiters or publicly share with the community
            that you are looking for new job opportunities.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center pr-6 md:order-2" // Change md:justify-end to justify-center to shift image left
        >
          <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-xl border-4 border-white/10">
            <img
              src="/dc.jpeg"
              alt="Open to Work"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Freelance */}
      <section className="py-8 px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-extrabold mb-6">
            Become the top Prolancer
          </h2>
          {/* text-gray-600 dark:text-black-300 */}
          <h2 className="text-4xl font-bold mb-6">Work. Earn. Grow.</h2>
          <p className="mb-10 text-gray-600 dark:text-black-300 font-bold max-w-xl mx-auto">
            Browse freelance gigs, track payments & climb the leaderboard.
          </p>
          <img
            src="https://illustrations.popsy.co/gray/freelancer.svg"
            alt="Freelance"
            className="mx-auto w-96 h-80 drop-shadow-2xl"
          />

          {/* Button */}
          <a
            href="/freelance"
            className="mt-10 inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:opacity-90 transition"
          >
            Prolance Now
          </a>

        </motion.div>
      </section>


      {/* Bug Bounty */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12"
        >
          {/* Left side - Image */}
          <div className="flex justify-start">
            <img
              src="bug.png"
              alt="Bug Bounty"
              className="w-80 rounded-2xl drop-shadow-xl"
            />
          </div>

          {/* Right side - Text + Button */}
          <div className="text-left">
            <h2 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">
              Turn Your Debugging Skills into Rewards
            </h2>
            <p className="mb-8 text-gray-600 dark:text-gray-300 max-w-md">
              Fix bugs, earn instant payouts, and build your profile as a top bug bounty hunter.
            </p>
            <a
              href="#"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              Go for Bug Bounty
            </a>
          </div>
        </motion.div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-6 max-w-7xl mx-auto" id="whyus">
        <h2 className="text-4xl font-extrabold mb-8 -mt-6 text-center">Why Choose Us?</h2>
        <h2 className="text-lg mb-14 text-center">Solution of thousands problem. All the relevant content and features are available here. No need to search here or there just call DC for all things and get prepared for everything!!!</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {[
            {
              front: (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/"  // replace with your image path
                    alt="Project Arena"
                    className="w-32 h-32 object-contain rounded-2xl"
                  />
                  <span className="font-bold text-2xl text-pink-600">
                    Project Arena
                  </span>
                </div>
              ),
              back: `Common problem faced of not getting the real-world project ideas. So explore our "PROJECT ARENA" section to get more...Happy Developing!!! ☺️`
            },

            {
              front: (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/team.png"  // replace with your image path
                    alt="Project Arena"
                    className="w-32 h-32 object-contain rounded-2xl"
                  />
                  <span className="font-bold text-2xl text-orange-600">
                    TeamHive
                  </span>
                </div>
              ), back: "Common problem faced of not having the desired team. So, join with the professionals from here. TeamHive here..."
            },

            {
              front: (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/collab.png"  // replace with your image path
                    className="w-32 h-32 object-contain rounded-2xl"
                  />
                  <span className="font-bold text-2xl text-purple-600">
                    CollabHub
                  </span>
                </div>
              ), back: "Your ultimate space to connect, team up, and co-create! Find like-minded developers, brainstorm ideas, share tasks, and build projects together seamlessly — because innovation happens when great minds collaborate."
            },

            {
              front: (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/bug.jpg"  // replace with your image path
                    // alt="Project Arena"
                    className="w-32 h-32 object-contain rounded-2xl"
                  />
                  <span className="font-bold text-2xl text-yellow-600">
                    Bug Bounty
                  </span>
                </div>
              ), back: "Earn, Learn, Grow... Debugging the bugs is the real learning whether it is of yours or of others... and earn the rewards or money!!!"
            },

            {
              front: (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/prolance.png"  // replace with your image path
                    alt="Prolance"
                    className="w-32 h-32 object-contain rounded-2xl"
                  />
                  <span className="font-bold text-2xl text-green-600">
                    Prolance
                  </span>
                </div>
              ), back: "Turn your passion into paychecks. Use your skills in right place. Win and Earn!!!  Happy lancing ☺️"
            },

            {
              front: (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/"  // replace with your image path
                    alt="ProjMart"
                    className="w-32 h-32 object-contain rounded-2xl"
                  />
                  <span className="font-bold text-2xl text-blue-600">
                    ProjMart
                  </span>
                </div>
              ), back: "Highlight your projects & get recognized. Sell or showcase your projects in the right platform. \n\nHappy Earning!!! ☺️"
            },

            {
              front: (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/devconnect.png"  // replace with your image path
                    alt="DevConnect"
                    className="w-32 h-32 object-contain rounded-2xl"
                  />
                  <span className="font-bold text-2xl text-cyan-600">
                    DevConnect
                  </span>
                </div>
              ), back: "Build meaningful developer connections. Learn the new techniques and technologies. Get the real world experience and knowledge. Happy Connecting!!! ☺️"
            },

            {
              front: (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/industryfit.png"  // replace with your image path
                    alt="indusrtyfit"
                    className="w-32 h-32 object-contain rounded-2xl"
                  />
                  <span className="font-bold text-2xl text-red-600">
                    IndustryFit
                  </span>
                </div>
              ), back: "Your shortcut to placement success. Get the full benefit from here. Experience, learn, earn, grow, debug, build all starts from here."
            },

            {
              front: (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/mindmerge.png"  // replace with your image path
                    alt="mindmerge"
                    className="w-32 h-32 object-contain rounded-3xl"
                  />
                  <span className="font-bold text-2xl text-pink-600">
                    MindMerge
                  </span>
                </div>
              ), back: "Contribute designs, notes & insights. Exchange the knowledge and skills as it is well said that -\"Knowledge grows when shared\"."
            },

            {
              front: (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/studystack.jpg"  // replace with your image path
                    alt="studystack"
                    className="w-32 h-32 object-contain rounded-2xl"
                  />
                  <span className="font-bold text-2xl text-orange-600">
                    StudyStack
                  </span>
                </div>
              ), back: "Domain wise cheatsheets for all subjects and courses. Learning by quizes and get rewards according. Beautify your DC portfolio by Learning, Earning, rewards and contributions..."
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              className="group [perspective:1000px] cursor-pointer"
              whileHover={{ scale: 1.1 }}   // ✅ Now scale applies on outer wrapper
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-56 w-56 [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 shadow-xl p-4 text-center text-gray-800 dark:text-gray-200 [backface-visibility:hidden]">
                  <p className="font-semibold">{card.front}</p>
                </div>
                {/* Back */}
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl p-4 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <p>{card.back}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className="py-20 px-6 max-w-8xl mx-auto bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]"
        id="benefits"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-300">
          Benefits You Get with DevChowk
        </h2>
        <p className="text-lg  dark:text-gray-300 text-center mb-14 max-w-3xl mx-auto">
          At DevChowk, we don’t just provide tools — we provide opportunities. From learning to
          earning, here’s how you benefit by being part of our ecosystem:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 ">
          {/* Benefit Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.04 }} // 👈 handles the scaling
            className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl text-center cursor-pointer max-w-md mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">🚀 Career Growth</h3>
            <p className="text-gray-200">
              Work on real-world projects, get placement-ready, and showcase your skills to recruiters.
            </p>
          </motion.div>


          {/* Benefit Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.04 }}
            className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl text-center cursor-pointer max-w-md mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4 text-purple-600">💰 Earn While Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Solve bugs, freelance, and contribute — every effort is rewarded with money, XP, or recognition.
            </p>
          </motion.div>

          {/* Benefit Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.04 }}
            className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl text-center cursor-pointer max-w-md mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4 text-green-600">🤝 Strong Network</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with developers, industry experts, and recruiters to build lasting opportunities.
            </p>
          </motion.div>

          {/* Benefit Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.04 }}
            className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl text-center cursor-pointer max-w-md mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4 text-pink-600">📚 Centralized Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access cheatsheets, notes, and quizzes for all domains — everything you need in one place.
            </p>
          </motion.div>

          {/* Benefit Card 5 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.04 }}
            className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl text-center cursor-pointer max-w-md mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4 text-yellow-600">🏆 Gamified Experience</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Earn XP, badges, and climb leaderboards while having fun learning and working.
            </p>
          </motion.div>

          {/* Benefit Card 6 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.04 }}
            className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl text-center cursor-pointer max-w-md mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4 text-red-600">🌍 Real-World Exposure</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Work on real problems, debug actual code, and gain experience that truly matters.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-10 px-6 max-w-7xl mx-auto" id="success">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Success Stories from Our Community
        </h2>
        <p className="text-lg text-gray-700 text-center mb-14 max-w-3xl mx-auto">
          See how developers, freelancers, and innovators are growing with DevChowk.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Story 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gray-800 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl text-center"
          >
            <img
              src="/user2.jpg"
              alt="User"
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-cyan-400"
            />
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Aman Sharma</h3>
            <p className="text-gray-300">
              “I found my dream team on DevChowk’s TeamHive. Now we’re working
              on real-world projects and even landed freelance gigs together!”
            </p>
          </motion.div>

          {/* Story 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 bg-gray-800 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl text-center"
          >
            <img
              src="/user1.avif"
              alt="User"
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-purple-400"
            />
            <h3 className="text-xl font-bold text-purple-400 mb-2">Sneha Patel</h3>
            <p className="text-gray-300">
              “Prolance gave me the confidence to turn my coding skills into
              income. I’ve completed 5 freelance gigs and built my portfolio.”
            </p>
          </motion.div>

          {/* Story 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="p-6 bg-gray-800 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl text-center"
          >
            <img
              src="/user3.jpg"
              alt="User"
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-pink-400"
            />
            <h3 className="text-xl font-bold text-pink-400 mb-2">Rahul Verma</h3>
            <p className="text-gray-300">
              “The BugBounty feature helped me sharpen my debugging skills and
              earn at the same time. Totally worth it!”
            </p>
          </motion.div>
        </div>
      </section>

      {/* <p className="text-center text-gray-800 -mt-3 text-lg">
        Stay tuned for more updated features. We are working to add more to boost your confidence and hands-on experience.
      </p> */}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-extrabold text-2xl mb-4">DevChowk</h3>
            <p className="text-gray-400">Empowering Developers & Recruiters in one place.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Newsletter</h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:scale-105 transition-transform">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 text-gray-500">
          © 2025 DevChowk. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
