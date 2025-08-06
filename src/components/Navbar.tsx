import { useState } from "react";
import { motion } from "framer-motion";
import icon from "../assets/icon.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import ThemeToggle from "./ThemeToggle"; // ✅ Import toggle

const sections = ["About", "Experience", "Skills", "Projects", "Testimonials", "Contact"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-light-background dark:bg-dark-background shadow-md transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.img
          src={icon}
          alt="Logo"
          className="w-12 h-12 cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4, x: -4, rotate: -3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Desktop Navigation */}
        <motion.div
          className="hidden nav:flex items-center gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <ul className="flex gap-6 text-sm font-medium">
            {sections.map((section, index) => (
              <motion.li
                key={section}
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <a
                  href={`#${section.toLowerCase()}`}
                  className="group transition-colors duration-200 text-light-textPrimary dark:text-dark-textPrimary hover:text-light-accent dark:hover:text-dark-accent"
                >
                  <span className="text-light-accent dark:text-dark-accent mr-1 font-mono">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  {section}
                </a>
              </motion.li>
            ))}
            <motion.li
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <a
                href="/resume.pdf"
                download
                className="px-4 py-2 rounded border border-light-accent dark:border-dark-accent text-light-accent dark:text-dark-accent hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors duration-200"
              >
                Resume
              </a>
            </motion.li>
          </ul>

          {/* Theme Toggle for Desktop */}
          <ThemeToggle />
        </motion.div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav:hidden text-light-textPrimary dark:text-dark-textPrimary p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="nav:hidden bg-light-background dark:bg-dark-background px-6 pb-6 pt-2 text-light-textPrimary dark:text-dark-textPrimary">
          <ul className="flex flex-col gap-4 text-sm font-medium">
            {sections.map((section, index) => (
              <li key={section}>
                <a
                  href={`#${section.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="block transition-colors duration-200 hover:text-light-accent dark:hover:text-dark-accent"
                >
                  <span className="text-light-accent dark:text-dark-accent mr-1 font-mono">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  {section}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                download
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 mt-2 rounded border border-light-accent dark:border-dark-accent text-light-accent dark:text-dark-accent hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors duration-200"
              >
                Resume
              </a>
            </li>
            {/* Theme Toggle for Mobile */}
            <li className="pt-2">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
