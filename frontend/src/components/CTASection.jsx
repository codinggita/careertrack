import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          {/* Background visuals */}
          <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-indigo-600 to-purple-700" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Start organizing your <br />
            internship journey today.
          </h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of students who have streamlined their job search and landed their dream roles with CareerTrack.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/signup"
              className="px-10 py-5 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-gray-50 transition-all shadow-xl shadow-black/10 text-lg"
            >
              Create Account
            </Link>
            <Link 
              to="/login"
              className="px-10 py-5 bg-transparent border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-lg"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
