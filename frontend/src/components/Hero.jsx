import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-white">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6 inline-block">
              A Better way to manage 
            </span>
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight">
              Track your Corporate <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                journey smarter
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              The all-in-one platform for students to track applications, schedule interviews, and land their dream internships with data-driven insights.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link 
                to="/signup"
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login"
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                Live Demo
              </Link>
            </div>
          </motion.div>

          {/* Dashboard Preview Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto rounded-3xl overflow-hidden border border-gray-200 shadow-2xl bg-white p-2">
              <div className="bg-gray-50 rounded-2xl p-4 aspect-[16/9] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-white rounded-xl flex flex-col p-6 overflow-hidden">
                  <div className="flex gap-4 mb-8">
                    <div className="w-1/4 h-32 bg-indigo-100 rounded-xl" />
                    <div className="w-1/4 h-32 bg-purple-100 rounded-xl" />
                    <div className="w-1/4 h-32 bg-blue-100 rounded-xl" />
                    <div className="w-1/4 h-32 bg-pink-100 rounded-xl" />
                  </div>
                  <div className="w-full h-full bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 font-medium">Dashboard Overview</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements for visual interest */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-40 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-40 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
