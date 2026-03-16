import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl flex items-center justify-between px-8 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/20 dark:border-slate-700/30 rounded-[2rem] shadow-2xl transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
          <span className="text-white font-black text-xl">C</span>
        </div>
        <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
          CareerTrack
        </span>
      </div>

      <div className="hidden md:flex items-center gap-10">
        <a href="#features" className="text-slate-600 dark:text-slate-300 font-bold hover:text-indigo-600 transition-colors">Features</a>
        <a href="#how-it-works" className="text-slate-600 dark:text-slate-300 font-bold hover:text-indigo-600 transition-colors">How It Works</a>
        <a href="#preview" className="text-slate-600 dark:text-slate-300 font-bold hover:text-indigo-600 transition-colors">Preview</a>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          to="/login"
          className="px-6 py-2.5 text-slate-700 dark:text-slate-200 font-bold hover:text-indigo-600 transition-colors flex items-center gap-2"
        >
          Login
        </Link>
        <Link 
          to="/signup"
          className="px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-none active:scale-95"
        >
          Join Now
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
