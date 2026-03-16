import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Sync Sources",
    description: "Import your internship applications and scheduled interviews in seconds with our smart connectors.",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/30"
  },
  {
    number: "02",
    title: "Execute Strategy",
    description: "Navigate your interview pipeline with precision. Track statuses, follow-ups, and feedback in real-time.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/30"
  },
  {
    number: "03",
    title: "Optimize Results",
    description: "Leverage advanced analytics to spot patterns in your search and maximize your conversion to offers.",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/30"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto mb-24">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter"
          >
            The CareerTrack <br />
            <span className="italic">Execution Framework</span>
          </motion.h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed italic">
            A battle-tested methodology to transform your internship search from chaotic to clinical.
          </p>
        </div>

        <div className="relative">
          {/* connector (visible on desktop) */}
          <div className="hidden lg:block absolute top-[3rem] left-[15%] right-[15%] h-1 bg-gradient-to-r from-indigo-200/50 via-purple-200/50 to-emerald-200/50 dark:from-indigo-900/40 dark:via-purple-900/40 dark:to-emerald-900/40 rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="flex flex-col items-center group"
              >
                <div className={`w-24 h-24 ${step.bgColor} ${step.color} rounded-[2rem] flex items-center justify-center text-3xl font-black mb-10 border-4 border-white dark:border-slate-800 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                  {step.number}
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight group-hover:text-indigo-600 transition-colors uppercase italic">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-xs font-bold leading-relaxed text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
