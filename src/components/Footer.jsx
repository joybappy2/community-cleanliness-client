import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="bg-secondary text-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo / Site Name */}
          <div className="flex flex-col items-start md:items-start">
            <h1 className="text-2xl font-bold text-white mb-2">FixMyCity</h1>
            <p className="text-gray-200 max-w-xs">
              A platform to report, track, and solve cleanliness issues in
              your community.
            </p>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-white">Useful Links</h2>
            <a href="/" className="hover:text-gray-300 transition-colors">
              Home
            </a>
            <a
              href="/explore"
              className="hover:text-gray-300 transition-colors"
            >
              Explore Issues
            </a>
            <a href="/about" className="hover:text-gray-300 transition-colors">
              About
            </a>
            <a
              href="/contact"
              className="hover:text-gray-300 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-white">Follow Us</h2>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-200 mt-10 text-sm">
          © {new Date().getFullYear()} FixMyCity. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
