import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">C</span>
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          CareerTrack
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
        <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">How It Works</a>
        <a href="#preview" className="text-gray-600 hover:text-indigo-600 transition-colors">Preview</a>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          to="/login"
          className="px-4 py-2 text-gray-700 font-medium hover:text-indigo-600 transition-colors"
        >
          Login
        </Link>
        <Link 
          to="/signup"
          className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          Sign Up
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
