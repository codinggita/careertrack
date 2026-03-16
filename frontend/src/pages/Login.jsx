import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { login as authLogin } from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
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
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const userData = await authLogin(formData);
      login(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden font-sans transition-colors duration-500">
      
      {/* Left Column: Branding Section (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-900 p-12 flex-col justify-between relative overflow-hidden shadow-2xl transition-all duration-500">
        
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
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-white text-3xl font-extrabold tracking-tight">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                   <div className="w-5 h-5 bg-white rounded-md" />
                </div>
                CareerTrack
              </div>
              <button
                  type="button"
                  onClick={toggleTheme}
                  className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95"
                  aria-label="Toggle theme"
              >
                  {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
              </button>
            </div>
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
             Track your corporate journey smarter
           </motion.h2>
           
           <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-indigo-100 text-center text-lg leading-relaxed"
           >
             Manage applications, track statuses, schedule interviews, and land your dream role with ease.
           </motion.p>
        </div>

        {/* Bottom Footer or secondary branding */}
        <div className="relative z-10 text-indigo-200 text-sm">
           © {new Date().getFullYear()} CareerTrack. All rights reserved.
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6 }}
           className="w-full max-w-md"
        >
          {/* Form Card */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl shadow-indigo-500/10 dark:shadow-none border border-white dark:border-slate-700/50 overflow-hidden relative z-10 transition-all duration-300">
             <div className="p-10 sm:p-12">
               <div className="text-center mb-10">
                 <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic">Welcome back</h2>
                 <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-bold uppercase tracking-widest italic opacity-60">Authentication Required</p>
               </div>

               <form className="space-y-6" onSubmit={handleSubmit}>
                 
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

                 {/* Email Input */}
                 <div>
                   <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email address</label>
                   <div className="relative group">
                     <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors duration-200">
                       <Mail className="h-5 w-5" />
                     </div>
                     <input 
                       ref={emailInputRef}
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

                 <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                        Forgot password?
                      </a>
                    </div>
                  </div>

                 {/* Submit Button */}
                 <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="pt-2">
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
                          <span>Signing in...</span>
                        </div>
                     ) : "Sign in"}
                   </button>
                 </motion.div>
               </form>
             </div>
             
             {/* Bottom Link Area */}
             <div className="px-8 py-6 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-700/50 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Don't have an account?{' '}
                  <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
                    Sign up
                  </a>
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
