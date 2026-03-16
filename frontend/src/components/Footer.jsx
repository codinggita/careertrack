import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="text-xl font-bold text-gray-900">CareerTrack</span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Empowering students to land their dream internships through smart application tracking and insights.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-16 md:gap-24">
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Product</h4>
              <ul className="space-y-4">
                <li><a href="#features" className="text-gray-500 hover:text-indigo-600">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-500 hover:text-indigo-600">How It Works</a></li>
                <li><a href="#preview" className="text-gray-500 hover:text-indigo-600">Preview</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Account</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-gray-500 hover:text-indigo-600">Home</Link></li>
                <li><Link to="/login" className="text-gray-500 hover:text-indigo-600">Login</Link></li>
                <li><Link to="/signup" className="text-gray-500 hover:text-indigo-600">Sign Up</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CareerTrack. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-400 hover:text-indigo-600 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-indigo-600 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
