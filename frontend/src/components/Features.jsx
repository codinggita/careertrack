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
    icon: <ClipboardCheck className="w-6 h-6 text-indigo-600" />,
    title: "Track Applications",
    description: "Keep all your internship applications in one organized place. Never miss a deadline again.",
    color: "bg-indigo-50"
  },
  {
    icon: <Calendar className="w-6 h-6 text-purple-600" />,
    title: "Interview Calendar",
    description: "Sync your interviews with your favorite calendar and get reminders before every meeting.",
    color: "bg-purple-50"
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-pink-600" />,
    title: "Application Analytics",
    description: "Visualize your success rates, response times, and identify which sectors are hiring.",
    color: "bg-pink-50"
  },
  {
    icon: <Search className="w-6 h-6 text-blue-600" />,
    title: "Search & Filter",
    description: "Quickly find specific opportunities and filter your application history by status.",
    color: "bg-blue-50"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Everything you need to <br />
            <span className="text-indigo-600">manage your journey</span>
          </motion.h2>
          <p className="text-lg text-gray-600">
            Powerful tools designed for students to take control of their career search and stay ahead of the competition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
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
