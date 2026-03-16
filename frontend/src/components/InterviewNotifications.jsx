import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, Building2, Briefcase, ChevronRight, X, AlertCircle } from 'lucide-react';
import * as applicationService from '../services/applicationService';
import { useNavigate } from 'react-router-dom';
import SkeletonCard from './SkeletonCard';

const InterviewNotifications = ({ userId }) => {
    const navigate = useNavigate();
    const [upcoming, setUpcoming] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUpcoming = async () => {
            try {
                const data = await applicationService.getUpcomingInterviews(userId);
                setUpcoming(data);
            } catch (error) {
                console.error('Failed to fetch upcoming interviews:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchUpcoming();
        }
    }, [userId]);

    const getDaysRemaining = (date) => {
        const today = new Date();
        const intDate = new Date(date);
        const diffTime = intDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
                <div className="h-6 w-1/4 bg-slate-100 dark:bg-slate-900 rounded-lg animate-pulse mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <SkeletonCard variant="notification" />
                    <SkeletonCard variant="notification" />
                    <SkeletonCard variant="notification" />
                </div>
            </div>
        );
    }
    
    if (upcoming.length === 0) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Bell className="w-5 h-5 text-indigo-500 animate-bounce" />
                    Interview Reminders
                </h3>
                <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full">
                    {upcoming.length} Upcoming
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcoming.map((int, i) => {
                    const days = getDaysRemaining(int.interviewDate);
                    const isSoon = days <= 2;

                    return (
                        <motion.div
                            key={int._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-4 rounded-2xl border transition-all hover:shadow-md cursor-pointer group relative overflow-hidden ${
                                isSoon 
                                ? 'bg-rose-50/50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/50' 
                                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-700'
                            }`}
                            onClick={() => navigate('/calendar')}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                                    isSoon ? 'bg-rose-100 dark:bg-rose-900/40 border-rose-200' : 'bg-white dark:bg-slate-800 border-slate-200'
                                }`}>
                                    <Building2 className={`w-5 h-5 ${isSoon ? 'text-rose-600' : 'text-indigo-600'}`} />
                                </div>
                                {isSoon && (
                                    <span className="px-2 py-0.5 bg-rose-600 text-white text-[10px] font-black rounded-lg uppercase tracking-tighter animate-pulse">
                                        Soon
                                    </span>
                                )}
                            </div>

                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors truncate">
                                    {int.companyName}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <Briefcase className="w-3 h-3" /> {int.role}
                                </p>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <span className={`text-[10px] font-bold flex items-center gap-1 ${isSoon ? 'text-rose-600' : 'text-slate-400'}`}>
                                    <Clock className="w-3 h-3" />
                                    {new Date(int.interviewDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </span>
                                <span className={`text-[10px] font-black uppercase ${isSoon ? 'text-rose-600' : 'text-indigo-600'}`}>
                                    {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days} Days`}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default InterviewNotifications;
