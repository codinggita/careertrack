import React from 'react';
import { motion } from 'framer-motion';

const DashboardPreview = () => {
  return (
    <section id="preview" className="py-24 bg-gray-50/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Powerful dashboard to <span className="text-indigo-600">organize your search</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our intuitive dashboard gives you a bird's-eye view of your entire internship application landscape. Manage deadlines, follow-ups, and interview prep in one unified interface.
            </p>
            <ul className="space-y-4">
              {[
                "Visualize application status pipeline",
                "Automated reminders for follow-ups",
                "Interview preparation checklist",
                "Company response rate tracking"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-indigo-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="bg-white rounded-3xl p-4 shadow-2xl border border-gray-100 overflow-hidden">
              {/* Mock Dashboard UI */}
              <div className="flex gap-4 mb-6">
                <div className="w-1/3 h-24 bg-indigo-50 rounded-2xl p-4">
                  <div className="w-1/2 h-2 bg-indigo-200 rounded mb-2" />
                  <div className="w-3/4 h-4 bg-indigo-600 rounded" />
                </div>
                <div className="w-1/3 h-24 bg-purple-50 rounded-2xl p-4">
                  <div className="w-1/2 h-2 bg-purple-200 rounded mb-2" />
                  <div className="w-3/4 h-4 bg-purple-600 rounded" />
                </div>
                <div className="w-1/3 h-24 bg-pink-50 rounded-2xl p-4">
                  <div className="w-1/2 h-2 bg-pink-200 rounded mb-2" />
                  <div className="w-3/4 h-4 bg-pink-600 rounded" />
                </div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl border border-gray-200" />
                      <div>
                        <div className="w-24 h-3 bg-gray-300 rounded mb-2" />
                        <div className="w-16 h-2 bg-gray-200 rounded" />
                      </div>
                    </div>
                    <div className="w-20 h-6 bg-indigo-100 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Glossy Overlay effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400 blur-[100px] opacity-20 -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400 blur-[100px] opacity-20 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
