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
        <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                        <CalendarIcon className="text-indigo-600" />
                        Interview Calendar
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Track and manage your upcoming internship interviews.</p>
                </div>
                <button 
                    onClick={() => navigate('/dashboard/applications')}
                    className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                >
                    Go to Applications
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700"
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
                        className="w-full border-none font-sans text-slate-700 dark:text-slate-300 dark:bg-slate-800"
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
                            padding: 1.5em 0.5em !important;
                            font-weight: 600;
                            border-radius: 12px;
                            transition: all 0.2s;
                        }
                        .react-calendar__tile:hover {
                            background: #f8fafc;
                            border-radius: 12px;
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
                            bottom: 8px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 6px;
                            height: 6px;
                            background: #4f46e5;
                            border-radius: 50%;
                        }
                        .react-calendar__navigation button {
                            font-size: 1.25rem;
                            font-weight: 700;
                            color: #4f46e5;
                            border-radius: 12px;
                        }
                        .react-calendar__month-view__weekdays__weekday {
                            text-transform: uppercase;
                            font-size: 0.75rem;
                            font-weight: 800;
                            color: #94a3b8;
                            text-decoration: none;
                        }
                        .dark .react-calendar__tile--now {
                            background: #312e81 !important;
                            color: #818cf8 !important;
                        }
                    `}} />
                </motion.div>

                {/* Upcoming Panel */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700 h-full">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-indigo-500" />
                            Upcoming Interviews
                        </h3>

                        {isLoading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-24 bg-slate-50 dark:bg-slate-900 rounded-2xl animate-pulse" />
                                ))}
                            </div>
                        ) : upcomingInterviews.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
                                    <AlertCircle className="w-8 h-8 text-indigo-500" />
                                </div>
                                <p className="text-slate-500 dark:text-slate-400">No interviews scheduled yet.</p>
                                <button 
                                    onClick={() => navigate('/dashboard/applications')}
                                    className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                                >
                                    Add an interview date
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {upcomingInterviews.map((int, i) => (
                                    <motion.div
                                        key={int._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        onClick={() => setSelectedInterview(int)}
                                        className="p-4 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 bg-slate-50 dark:bg-slate-900/50 cursor-pointer group transition-all"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                                                    {int.companyName}
                                                </h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{int.role}</p>
                                            </div>
                                            <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-indigo-600">
                                                {new Date(int.interviewDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedInterview(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden"
                        >
                            <div className="p-6 text-center border-b border-slate-100 dark:border-slate-700 relative">
                                <button 
                                    onClick={() => setSelectedInterview(null)}
                                    className="absolute right-4 top-4 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedInterview.companyName}</h3>
                                <p className="text-slate-500 flex items-center justify-center gap-2 mt-1">
                                    <Briefcase className="w-4 h-4" /> {selectedInterview.role}
                                </p>
                            </div>

                            <div className="p-8 space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl">
                                    <span className="text-sm text-slate-500 font-medium">Interview Date</span>
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        {new Date(selectedInterview.interviewDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
                                    <span className="text-sm text-indigo-600 font-medium">Status</span>
                                    <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900 rounded-lg text-xs font-bold text-indigo-600">
                                        {selectedInterview.status}
                                    </span>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button 
                                        onClick={() => navigate('/dashboard/applications')}
                                        className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all"
                                    >
                                        View Application
                                    </button>
                                    <button 
                                        onClick={() => setSelectedInterview(null)}
                                        className="px-6 py-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InterviewCalendar;
