import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signup as authSignup } from '../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await authSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      setIsLoading(false);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden font-sans">
      
      {/* Left Column: Branding Section (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-900 p-12 flex-col justify-between relative overflow-hidden shadow-2xl">
        
        {/* Animated Background Blobs */}
        <motion.div 
           animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        />
        <motion.div 
           animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        />

        {/* Top Branding Logo Name */}
        <div className="relative z-10">
          <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-white text-3xl font-extrabold tracking-tight flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
               <div className="w-5 h-5 bg-white rounded-md" />
            </div>
            CareerTrack
          </motion.div>
        </div>

        {/* Center Presentation */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-md mx-auto">
           {/* Floating Logo App Icon representation */}
           <motion.div
             animate={{ y: [-10, 10, -10] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="w-48 h-48 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex flex-col items-center justify-center shadow-2xl mb-12"
           >
              <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
                 <div className="w-12 h-12 bg-white rounded-xl shadow-lg" />
              </div>
           </motion.div>
           
           <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white text-4xl font-bold text-center mb-6 leading-tight"
           >
             Start tracking your career journey today
           </motion.h2>
           
           <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-indigo-100 text-center text-lg leading-relaxed"
           >
             Join thousands of students managing their applications, securing interviews, and landing their dream roles.
           </motion.p>
        </div>

        {/* Bottom Footer or secondary branding */}
        <div className="relative z-10 text-indigo-200 text-sm">
           © {new Date().getFullYear()} CareerTrack. All rights reserved.
        </div>
      </div>

      {/* Right Column: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative overflow-y-auto">
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6 }}
           className="w-full max-w-md my-auto"
        >
          {/* Form Card */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl shadow-indigo-500/10 dark:shadow-none border border-white dark:border-slate-700/50 overflow-hidden relative z-10">
             <div className="p-10 sm:p-12">
               <div className="text-center mb-10">
                 <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic">Create Account</h2>
                 <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-bold uppercase tracking-widest italic opacity-60">Join the Elite</p>
               </div>

               <form className="space-y-5" onSubmit={handleSubmit}>
                 
                 {/* Error State */}
                 {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-red-50/80 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-md"
                    >
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-sm text-red-700 dark:text-red-400 font-medium">{error}</p>
                        </div>
                      </div>
                    </motion.div>
                 )}

                 {/* Full Name Input */}
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                   <div className="relative group">
                     <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors duration-200">
                       <User className="h-5 w-5" />
                     </div>
                     <input 
                       ref={nameInputRef}
                       type="text"
                       name="name"
                       value={formData.name}
                       onChange={handleChange}
                       className="block w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-600/50 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200 sm:text-sm shadow-sm"
                       placeholder="John Doe"
                     />
                   </div>
                 </div>

                 {/* Email Input */}
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email address</label>
                   <div className="relative group">
                     <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors duration-200">
                       <Mail className="h-5 w-5" />
                     </div>
                     <input 
                       type="email"
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                       className="block w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-600/50 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200 sm:text-sm shadow-sm"
                       placeholder="you@example.com"
                     />
                   </div>
                 </div>

                 {/* Password Input */}
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Password</label>
                   <div className="relative group">
                     <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors duration-200">
                       <Lock className="h-5 w-5" />
                     </div>
                     <input 
                       type="password"
                       name="password"
                       value={formData.password}
                       onChange={handleChange}
                       className="block w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-600/50 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200 sm:text-sm shadow-sm"
                       placeholder="••••••••"
                     />
                   </div>
                 </div>

                 {/* Confirm Password Input */}
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Confirm Password</label>
                   <div className="relative group">
                     <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors duration-200">
                       <Lock className="h-5 w-5" />
                     </div>
                     <input 
                       type="password"
                       name="confirmPassword"
                       value={formData.confirmPassword}
                       onChange={handleChange}
                       className="block w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-600/50 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition-all duration-200 sm:text-sm shadow-sm"
                       placeholder="••••••••"
                     />
                   </div>
                 </div>

                 {/* Submit Button */}
                 <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="pt-4">
                   <button
                     type="submit"
                     disabled={isLoading}
                     className={`w-full flex justify-center py-3.5 px-4 rounded-xl shadow-md text-sm font-bold tracking-wide text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${
                       isLoading ? 'opacity-80 cursor-wait shadow-none' : 'hover:shadow-lg'
                     }`}
                   >
                     {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="animate-spin h-5 w-5" />
                          <span>Creating Account...</span>
                        </div>
                     ) : "Create Account"}
                   </button>
                 </motion.div>
                 
               </form>

               {/* Social Login Placeholders */}
               <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200 dark:border-slate-700/50"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-4 py-2.5 border border-slate-200 dark:border-slate-600/50 rounded-xl shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                        <path
                          d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                          fill="#EA4335"
                        />
                        <path
                          d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                          fill="#34A853"
                        />
                      </svg>
                      <span className="ml-2">Google</span>
                    </a>
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-4 py-2.5 border border-slate-200 dark:border-slate-600/50 rounded-xl shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">GitHub</span>
                    </a>
                  </div>
               </div>

             </div>
             
             {/* Bottom Link Area */}
             <div className="px-8 py-6 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-700/50 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
                    Log in
                  </Link>
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
