import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Add your applications",
    description: "Import your internship applications automatically or add them manually in seconds.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  },
  {
    number: "02",
    title: "Track progress",
    description: "Keep track of interview schedules, follow-ups, and application statuses effortlessly.",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    number: "03",
    title: "Analyze insights",
    description: "Get data-driven insights on your job search performance and optimize your strategy.",
    color: "text-pink-600",
    bgColor: "bg-pink-50"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            How it works
          </motion.h2>
          <p className="text-lg text-gray-600">
            A simple three-step process to transform your chaotic search into a streamlined success story.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (visible on desktop) */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center"
              >
                <div className={`w-20 h-20 ${step.bgColor} ${step.color} rounded-full flex items-center justify-center text-2xl font-black mb-8 border-4 border-white shadow-xl`}>
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 max-w-sm">
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
