import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200 dark:shadow-none">
                C
              </div>
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">CareerTrack</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-bold italic">
              Empowering the next generation of industry leaders to land their dream internships through clinical precision.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-16 md:gap-32">
            <div>
              <h4 className="font-black text-slate-900 dark:text-white mb-8 uppercase tracking-widest text-xs">Product</h4>
              <ul className="space-y-6">
                <li><a href="#features" className="text-slate-500 dark:text-slate-400 font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-slate-500 dark:text-slate-400 font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Framework</a></li>
                <li><a href="#preview" className="text-slate-500 dark:text-slate-400 font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Interface</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-slate-900 dark:text-white mb-8 uppercase tracking-widest text-xs">Access</h4>
              <ul className="space-y-6">
                <li><Link to="/" className="text-slate-500 dark:text-slate-400 font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link></li>
                <li><Link to="/login" className="text-slate-500 dark:text-slate-400 font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Sign In</Link></li>
                <li><Link to="/signup" className="text-slate-500 dark:text-slate-400 font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Register</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 dark:text-slate-500 text-sm font-bold">
            © {new Date().getFullYear()} CareerTrack clinical operations. Built for excellence.
          </p>
          <div className="flex gap-10">
            <a href="#" className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-black uppercase tracking-widest">Privacy</a>
            <a href="#" className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-black uppercase tracking-widest">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
