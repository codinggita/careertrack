import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-40 pb-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="px-6 py-2 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-indigo-600 dark:text-indigo-400 text-sm font-black mb-8 inline-block shadow-xl shadow-indigo-100 dark:shadow-none border border-white dark:border-slate-700 uppercase tracking-widest"
            >
              The Next-Gen Career Tracker
            </motion.span>
            
            <h1 className="text-7xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[0.9]">
              Career Tracking <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient">
                Done Right.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto font-medium italic">
              Scale your potential. Organize applications, stay ahead of interviews, and land your dream role with the software designed for high achievers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
              <Link 
                to="/signup"
                className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-700 hover:scale-105 transition-all shadow-2xl shadow-indigo-400/30 flex items-center justify-center gap-3 group active:scale-95"
              >
                Start Your Journey
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login"
                className="w-full sm:w-auto px-10 py-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl text-slate-900 dark:text-white font-black rounded-3xl border border-white dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
              >
                <Play className="w-5 h-5 fill-indigo-600 text-indigo-600" />
                Live Preview
              </Link>
            </div>
          </motion.div>

          {/* Premium Preview Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative perspective-1000"
          >
            <div className="relative mx-auto rounded-[3rem] p-4 bg-white/20 dark:bg-slate-800/20 backdrop-blur-2xl border border-white/30 dark:border-slate-700 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.2)] dark:shadow-none hover:rotate-x-2 transition-transform duration-700 ease-out">
              <div className="bg-slate-950 rounded-[2rem] p-2 aspect-[16/9] overflow-hidden group shadow-2xl">
                <div className="relative w-full h-full bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-950 rounded-[1.5rem] flex flex-col p-8 overflow-hidden">
                  <div className="flex gap-6 mb-12">
                    <div className="w-1/4 h-40 bg-indigo-500/10 rounded-3xl border border-indigo-500/20 animate-pulse" />
                    <div className="w-1/4 h-40 bg-purple-500/10 rounded-3xl border border-purple-500/20" />
                    <div className="w-1/4 h-40 bg-blue-500/10 rounded-3xl border-blue-500/20 animate-pulse" />
                    <div className="w-1/4 h-40 bg-emerald-500/10 rounded-3xl border-emerald-500/20" />
                  </div>
                  <div className="w-full h-full bg-indigo-500/5 rounded-3xl border border-white/5 flex items-center justify-center backdrop-blur-3xl">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                        <ArrowRight className="text-white w-8 h-8" />
                      </div>
                      <span className="text-indigo-400 font-black text-xl tracking-tighter uppercase italic opacity-60">Interactive Dashboard</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual Flair */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] opacity-20 animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
