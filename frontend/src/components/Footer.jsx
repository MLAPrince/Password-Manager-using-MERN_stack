


import { ShieldCheck, FileText, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900/80 text-gray-300 py-4 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left: Branding & crafted line */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start font-extrabold text-lg">
            <span className="text-white">MLA</span>
            <span className="text-lime-400 ml-1">Pass</span>
            <span className="ml-2 font-normal text-sm text-gray-400">
              &copy; {currentYear} All rights reserved.
            </span>
          </div>
          <p className="mt-1 text-gray-400 text-sm">
            Crafted with <span className="text-red-500">❤</span> by MLA.
          </p>
        </div>

        {/* Right: Links with icons */}
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
            href="/contact"
            className="flex items-center gap-2 hover:text-lime-400 transition-colors duration-150"
          >
            <Mail size={16} /> Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
