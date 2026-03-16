import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Building2, Briefcase, X, ChevronRight, AlertCircle } from 'lucide-react';
import * as applicationService from '../services/applicationService';
import { useNavigate } from 'react-router-dom';

const CalendarWidget = ({ userId }) => {
    const navigate = useNavigate();
    const [interviews, setInterviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedInterview, setSelectedInterview] = useState(null);

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const data = await applicationService.getInterviews(userId);
                setInterviews(data);
            } catch (error) {
                console.error('Failed to fetch interviews for widget:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchInterviews();
        }
    }, [userId]);

    const getInterviewsForDate = (date) => {
        return interviews.filter(interview => {
            const intDate = new Date(interview.interviewDate);
            return (
                intDate.getDate() === date.getDate() &&
                intDate.getMonth() === date.getMonth() &&
                intDate.getFullYear() === date.getFullYear()
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
        .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate))
        .slice(0, 3);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-indigo-500" />
                    Upcoming Interviews
                </h3>
                <button 
                    onClick={() => navigate('/calendar')}
                    className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1"
                >
                    Full View <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {isLoading ? (
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : interviews.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
                        <AlertCircle className="w-8 h-8 text-indigo-500" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">No interviews scheduled yet.</p>
                    <button 
                        onClick={() => navigate('/dashboard/applications')}
                        className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
                    >
                        Add Interview Date
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                    <div className="calendar-container overflow-hidden rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 p-2">
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
                            className="w-full border-none font-sans text-slate-700 dark:text-slate-300 bg-transparent"
                        />
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next 3 Interviews</h4>
                        {upcomingInterviews.map((int, i) => (
                            <motion.div
                                key={int._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setSelectedInterview(int)}
                                className="p-4 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 bg-white dark:bg-slate-900 cursor-pointer group transition-all"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50">
                                            <Building2 className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">
                                                {int.companyName}
                                            </h4>
                                            <p className="text-[10px] text-slate-500 dark:text-slate-400">{int.role}</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-indigo-600 rounded-lg text-[10px] font-bold text-white">
                                        {new Date(int.interviewDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                .react-calendar {
                    width: 100% !important;
                    background: transparent !important;
                    border: none !important;
                    font-size: 0.8rem;
                }
                .react-calendar__tile--now {
                    background: #e0e7ff !important;
                    color: #4f46e5 !important;
                    border-radius: 8px;
                }
                .react-calendar__tile--active {
                    background: #4f46e5 !important;
                    color: white !important;
                    border-radius: 8px;
                }
                .react-calendar__tile {
                    padding: 0.75em 0.5em !important;
                    font-weight: 600;
                    border-radius: 8px;
                    transition: all 0.2s;
                }
                .highlight-date::after {
                    content: '';
                    position: absolute;
                    bottom: 4px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 4px;
                    height: 4px;
                    background: #4f46e5;
                    border-radius: 50%;
                }
                .react-calendar__navigation button {
                    font-weight: 700;
                    color: #4f46e5;
                }
                .dark .react-calendar__tile--now {
                    background: #312e81 !important;
                    color: #818cf8 !important;
                }
                .dark .react-calendar__navigation button {
                    color: #818cf8;
                }
                .dark .react-calendar__month-view__weekdays__weekday {
                    color: #64748b;
                }
            `}} />

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
                            className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden"
                        >
                            <div className="p-6 text-center border-b border-slate-100 dark:border-slate-700 relative">
                                <button 
                                    onClick={() => setSelectedInterview(null)}
                                    className="absolute right-4 top-4 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                    <Building2 className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedInterview.companyName}</h3>
                                <p className="text-xs text-slate-500 flex items-center justify-center gap-1 mt-1">
                                    <Briefcase className="w-3 h-3" /> {selectedInterview.role}
                                </p>
                            </div>

                            <div className="p-6 space-y-3">
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                    <span className="text-xs text-slate-500 font-medium">Interview Date</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                        {new Date(selectedInterview.interviewDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                                    <span className="text-xs text-indigo-600 font-medium">Status</span>
                                    <span className="px-2 py-1 bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900 rounded-lg text-[10px] font-bold text-indigo-600">
                                        {selectedInterview.status}
                                    </span>
                                </div>

                                <div className="pt-3 flex gap-2">
                                    <button 
                                        onClick={() => navigate('/dashboard/applications')}
                                        className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all"
                                    >
                                        View Application
                                    </button>
                                    <button 
                                        onClick={() => setSelectedInterview(null)}
                                        className="px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
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

export default CalendarWidget;
