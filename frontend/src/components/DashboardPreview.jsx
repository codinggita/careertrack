import React from 'react';
import { motion } from 'framer-motion';

const DashboardPreview = () => {
  return (
    <section id="preview" className="py-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -z-10 transition-all duration-500" />
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[0.9]">
              The Interface of <br />
              <span className="italic underline decoration-indigo-500 decoration-8 underline-offset-8">Execution.</span>
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium italic">
              Our intuitive dashboard gives you a bird's-eye view of your entire internship application landscape. Manage deadlines, follow-ups, and interview prep in one unified interface.
            </p>
            <ul className="space-y-6">
              {[
                "Visualize application status pipeline",
                "Automated reminders for follow-ups",
                "Interview preparation checklist",
                "Company response rate tracking"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-black uppercase text-xs tracking-widest italic">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-200 dark:shadow-none">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl rounded-[3rem] p-8 shadow-2xl border border-white dark:border-slate-700 overflow-hidden transform lg:rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
              {/* Mock Dashboard UI */}
              <div className="flex gap-6 mb-10">
                <div className="w-1/3 h-32 bg-indigo-50 dark:bg-indigo-900/30 rounded-[2rem] p-6 shadow-inner border border-indigo-100 dark:border-indigo-800/50">
                  <div className="w-1/2 h-2 bg-indigo-300 dark:bg-indigo-700 rounded-full mb-4" />
                  <div className="w-full h-6 bg-indigo-600 rounded-xl" />
                </div>
                <div className="w-1/3 h-32 bg-amber-50 dark:bg-amber-900/30 rounded-[2rem] p-6 shadow-inner border border-amber-100 dark:border-amber-800/50">
                  <div className="w-1/2 h-2 bg-amber-300 dark:bg-amber-700 rounded-full mb-4" />
                  <div className="w-full h-6 bg-amber-500 rounded-xl" />
                </div>
                <div className="w-1/3 h-32 bg-emerald-50 dark:bg-emerald-900/30 rounded-[2rem] p-6 shadow-inner border border-emerald-100 dark:border-emerald-800/50">
                  <div className="w-1/2 h-2 bg-emerald-300 dark:bg-emerald-700 rounded-full mb-4" />
                  <div className="w-full h-6 bg-emerald-500 rounded-xl" />
                </div>
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-slate-50 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm" />
                      <div>
                        <div className="w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded-full mb-3" />
                        <div className="w-20 h-2 bg-slate-100 dark:bg-slate-800 rounded-full" />
                      </div>
                    </div>
                    <div className="w-24 h-8 bg-indigo-50 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center">
                      <div className="w-12 h-2 bg-indigo-200 dark:bg-indigo-700 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Visual Flair */}
            <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-indigo-500/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-40px] left-[-40px] w-48 h-48 bg-purple-500/20 rounded-full blur-[80px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
