import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardCheck, 
  Calendar, 
  BarChart3, 
  Search 
} from 'lucide-react';

const features = [
  {
    icon: <ClipboardCheck className="w-7 h-7 text-indigo-600" />,
    title: "Application Pipeline",
    description: "Track your progress from application to offer with our intelligent pipeline manager.",
    color: "bg-indigo-50 dark:bg-indigo-900/20"
  },
  {
    icon: <Calendar className="w-7 h-7 text-amber-600" />,
    title: "Smart Calendar",
    description: "Never miss a meeting. Our integrated calendar keeps your schedule tight and your reminders on point.",
    color: "bg-amber-50 dark:bg-amber-900/20"
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-emerald-600" />,
    title: "Deep Analytics",
    description: "Get data-driven insights on your success rates and response times to optimize your strategy.",
    color: "bg-emerald-50 dark:bg-emerald-900/20"
  },
  {
    icon: <Search className="w-7 h-7 text-blue-600" />,
    title: "Instant Search",
    description: "Find exactly what you need with powerful filters and real-time search across all applications.",
    color: "bg-blue-50 dark:bg-blue-900/20"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-32 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] transition-all duration-500" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              Powerful tools for <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                high-impact students
              </span>
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium italic">
              Everything you need to manage your career journey with professional-grade precision.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
