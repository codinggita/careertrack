import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Building2, Briefcase, ChevronRight, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as applicationService from '../services/applicationService';
import { useNavigate } from 'react-router-dom';

const InterviewCalendar = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [interviews, setInterviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedInterview, setSelectedInterview] = useState(null);

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const userId = currentUser.id || currentUser._id;
                const data = await applicationService.getInterviews(userId);
                setInterviews(data);
            } catch (error) {
                console.error('Failed to fetch interviews:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (currentUser) {
            fetchInterviews();
        }
    }, [currentUser]);

    const getInterviewsForDate = (date) => {
        return interviews.filter(interview => {
            const interviewDate = new Date(interview.interviewDate);
            return (
                interviewDate.getDate() === date.getDate() &&
                interviewDate.getMonth() === date.getMonth() &&
                interviewDate.getFullYear() === date.getFullYear()
            );
        });
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateInterviews = getInterviewsForDate(date);
            if (dateInterviews.length > 0) {
                return 'highlight-date';
            }
        }
        return null;
    };

    const upcomingInterviews = interviews
        .filter(int => new Date(int.interviewDate) >= new Date())
        .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate));

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-10">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none">
                                <CalendarIcon className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Interview Calendar
                            </h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium italic">
                            Track and manage your upcoming internship interviews.
                        </p>
                    </div>
                    
                    <button 
                        onClick={() => navigate('/dashboard/applications')}
                        className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-3.5 rounded-2xl font-black text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none"
                    >
                        Go to Applications
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Calendar Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white dark:border-slate-700"
                    >
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            tileClassName={tileClassName}
                            onClickDay={(date) => {
                                const dateInterviews = getInterviewsForDate(date);
                                if (dateInterviews.length > 0) {
                                    setSelectedInterview(dateInterviews[0]);
                                }
                            }}
                            className="w-full border-none font-sans text-slate-700 dark:text-slate-300 dark:bg-transparent"
                        />
                        
                        <style dangerouslySetInnerHTML={{ __html: `
                            .react-calendar {
                                width: 100% !important;
                                background: transparent !important;
                                border: none !important;
                            }
                            .react-calendar__tile--now {
                                background: #e0e7ff !important;
                                color: #4f46e5 !important;
                                border-radius: 12px;
                            }
                            .react-calendar__tile--active {
                                background: #4f46e5 !important;
                                color: white !important;
                                border-radius: 12px;
                                box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4);
                            }
                            .react-calendar__tile {
                                padding: 2em 0.5em !important;
                                font-weight: 700;
                                border-radius: 12px;
                                transition: all 0.2s;
                            }
                            .react-calendar__tile:hover {
                                background: #f8fafc;
                                border-radius: 12px;
                                transform: scale(1.05);
                            }
                            .dark .react-calendar__tile:hover {
                                background: #334155;
                            }
                            .highlight-date {
                                position: relative;
                            }
                            .highlight-date::after {
                                content: '';
                                position: absolute;
                                bottom: 10px;
                                left: 50%;
                                transform: translateX(-50%);
                                width: 8px;
                                height: 8px;
                                background: #4f46e5;
                                border-radius: 50%;
                                box-shadow: 0 0 10px #4f46e5;
                            }
                            .react-calendar__navigation button {
                                font-size: 1.25rem;
                                font-weight: 800;
                                color: #4f46e5;
                                border-radius: 12px;
                            }
                            .react-calendar__month-view__weekdays__weekday {
                                text-transform: uppercase;
                                font-size: 0.8rem;
                                font-weight: 900;
                                color: #94a3b8;
                                text-decoration: none;
                            }
                            .dark .react-calendar__tile--now {
                                background: #312e81 !important;
                                color: #818cf8 !important;
                            }
                            .dark .react-calendar__navigation button:hover {
                                background: #334155 !important;
                            }
                        `}} />
                    </motion.div>

                    {/* Upcoming Panel */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white dark:border-slate-700 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-indigo-500 animate-pulse" />
                                    Upcoming
                                </h3>
                                <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase rounded-full tracking-widest">
                                    {upcomingInterviews.length} Scheduled
                                </span>
                            </div>

                            {isLoading ? (
                                <div className="space-y-6">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-28 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl animate-pulse" />
                                    ))}
                                </div>
                            ) : upcomingInterviews.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-6">
                                    <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl flex items-center justify-center">
                                        <AlertCircle className="w-10 h-10 text-indigo-500 opacity-50" />
                                    </div>
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400 font-bold mb-4 italic">No interviews scheduled yet.</p>
                                        <button 
                                            onClick={() => navigate('/dashboard/applications')}
                                            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
                                        >
                                            Add Date Now
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                                    {upcomingInterviews.map((int, i) => (
                                        <motion.div
                                            key={int._id}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            onClick={() => setSelectedInterview(int)}
                                            className="p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-900 hover:shadow-lg bg-slate-50/50 dark:bg-slate-900/40 cursor-pointer group transition-all relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 dark:bg-indigo-600/5 rounded-full blur-2xl -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            
                                            <div className="flex justify-between items-start relative z-10">
                                                <div className="space-y-1">
                                                    <h4 className="font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                                                        {int.companyName}
                                                    </h4>
                                                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                                        <Briefcase className="w-3 h-3 text-indigo-400" />
                                                        {int.role}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-[10px] font-black uppercase text-indigo-500 tracking-tighter">
                                                        {new Date(int.interviewDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-slate-400">
                                                        {new Date(int.interviewDate).toLocaleDateString(undefined, { year: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Detail Modal */}
                <AnimatePresence>
                    {selectedInterview && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedInterview(null)}
                                className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                                className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border border-white dark:border-slate-700 overflow-hidden"
                            >
                                <div className="p-8 text-center border-b border-slate-50 dark:border-slate-700 relative">
                                    <button 
                                        onClick={() => setSelectedInterview(null)}
                                        className="absolute right-6 top-6 p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                    >
                                        <X className="w-6 h-6 text-slate-400" />
                                    </button>
                                    <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                                        <Building2 className="w-10 h-10 text-indigo-600" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{selectedInterview.companyName}</h3>
                                    <div className="flex items-center justify-center gap-2 mt-2 px-6">
                                        <span className="h-[2px] w-8 bg-indigo-100 dark:bg-indigo-900" />
                                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest italic">
                                            {selectedInterview.role}
                                        </p>
                                        <span className="h-[2px] w-8 bg-indigo-100 dark:bg-indigo-900" />
                                    </div>
                                </div>

                                <div className="p-10 space-y-6">
                                    <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-100 dark:border-slate-700">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                                                <CalendarIcon className="w-5 h-5 text-indigo-600" />
                                            </div>
                                            <span className="text-sm text-slate-500 font-bold uppercase tracking-tighter">Scheduled For</span>
                                        </div>
                                        <span className="font-black text-slate-900 dark:text-white">
                                            {new Date(selectedInterview.interviewDate).toLocaleDateString(undefined, { dateStyle: 'full' })}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-6 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-3xl border border-indigo-100 dark:border-indigo-900/40">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-center">
                                                <Trophy className="w-5 h-5 text-indigo-600" />
                                            </div>
                                            <span className="text-sm text-indigo-600 font-bold uppercase tracking-tighter">Current Status</span>
                                        </div>
                                        <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-200 dark:shadow-none">
                                            {selectedInterview.status}
                                        </span>
                                    </div>

                                    <div className="pt-8 flex gap-4">
                                        <button 
                                            onClick={() => navigate('/dashboard/applications')}
                                            className="flex-1 py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-3xl font-black shadow-2xl shadow-indigo-200 dark:shadow-none hover:translate-y-[-2px] transition-all active:scale-95 flex items-center justify-center gap-3"
                                        >
                                            View Full Application
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={() => setSelectedInterview(null)}
                                            className="px-10 py-5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-3xl font-black hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default InterviewCalendar;
