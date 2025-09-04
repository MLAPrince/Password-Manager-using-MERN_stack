import { ShieldCheck, FileText, Mail, Github, Linkedin, Key } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 bg-gray-900/80 text-gray-300 py-4 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-4">
        {/* Top Row: Left Section | Centered Social Icons | Right Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Section: Large Icon + MLA Pass Text */}
          <div className="flex items-center gap-0">
            {/* <Key size={32} className="text-[rgb(201,212,38)]" /> */}
            <Link to="/" className="font-extrabold text-2xl">
              <span className="text-white">MLA</span>
              <span className="text-lime-400 ml-1">Pass</span>
            </Link>
            <span className="ml-1 text-md pt-[2px]">- Your Own Password Manager</span>
          </div>

          {/* Middle Section: Centered Social Icons */}
          <div className="flex items-center justify-center gap-2 md:ml-0"> {/* Centered social icons */}
            <a
              href="https://github.com/MLAPrince"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-1 hover:text-lime-400 transition-colors duration-150"
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/mohiudeen-52bb35175"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-1 hover:text-lime-400 transition-colors duration-150"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>

          {/* Right Section: Policy/Contact Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <a
              href="/privacy-policy"
              className="flex items-center gap-2 hover:text-lime-400 transition-colors duration-150"
            >
              <ShieldCheck size={16} /> Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="flex items-center gap-2 hover:text-lime-400 transition-colors duration-150"
            >
              <FileText size={16} /> Terms of Service
            </a>
            <a
              href="https://mohiuddin-portfolio1.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-lime-400 transition-colors duration-150"
            >
              <Mail size={16} /> Contact Us
            </a>
          </div>
        </div>

        {/* Bottom Row: Copyright and Crafted text, all centered */}
        <div className="text-center text-sm text-gray-400 mt-2">
          <p>
            <span to="/" className="font-extrabold ">
              <span className="text-white">MLA</span>
              <span className="text-lime-400 ml-1">Pass</span>
            </span>
            <span className="ml-2 font-normal">&copy; {currentYear} All rights reserved. Crafted with <span className="text-red-500">❤</span> by Muhammad Mohiuddin.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;