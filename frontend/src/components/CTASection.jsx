import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-[3.5rem] p-12 md:p-24 text-center overflow-hidden shadow-[0_40px_80px_-15px_rgba(79,70,229,0.3)]"
        >
          {/* Background visuals */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-[120px] -ml-64 -mb-64" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-[0.9] italic">
              Ready to <br />
              <span className="text-indigo-200">Accelerate?</span>
            </h2>
            <p className="text-white/80 text-xl md:text-2xl mb-14 max-w-2xl mx-auto font-medium leading-relaxed italic">
              Join the elite circle of students who use CareerTrack to systematically dismantle the competition.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link 
                to="/signup"
                className="w-full sm:w-auto px-12 py-6 bg-white text-indigo-700 font-black rounded-[2rem] hover:bg-slate-50 hover:scale-105 transition-all shadow-2xl text-xl active:scale-95"
              >
                Create Your Account
              </Link>
              <Link 
                to="/login"
                className="w-full sm:w-auto px-12 py-6 bg-transparent border-2 border-white/40 text-white font-black rounded-[2rem] hover:bg-white/10 hover:border-white transition-all text-xl active:scale-95"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
