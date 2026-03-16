import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as applicationService from '../services/applicationService';
import CalendarWidget from '../components/CalendarWidget';
import InterviewNotifications from '../components/InterviewNotifications';
import AnalyticsSection from '../components/AnalyticsSection';
import { LayoutDashboard, Briefcase, GraduationCap, Trophy } from 'lucide-react';

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        interviews: 0,
        offers: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const userId = currentUser.id || currentUser._id;
                const data = await applicationService.getApplications(userId, { limit: 1000 });
                const apps = data.applications || [];
                
                setApplications(apps);
                setStats({
                    total: apps.length,
                    interviews: apps.filter(a => a.interviewDate).length,
                    offers: apps.filter(a => a.status === 'Offer').length
                });
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (currentUser) {
            fetchDashboardData();
        }
    }, [currentUser]);

    const userId = currentUser?._id || currentUser?.id;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-10">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none">
                                <LayoutDashboard className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Career Dashboard
                            </h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium italic">
                            Welcome back, {currentUser?.name}! Ready to land your next role?
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={logout}
                            className="px-6 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                        >
                            Logout
                        </button>
                    </div>
                </motion.div>

                {/* Notification Panel */}
                <InterviewNotifications userId={userId} />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        onClick={() => navigate('/dashboard/applications')}
                        className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-white dark:border-slate-700 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-2xl group-hover:bg-indigo-100 transition-colors" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center mb-6">
                                <Briefcase className="w-6 h-6 text-indigo-600" />
                            </div>
                            <span className="text-4xl font-black text-slate-900 dark:text-white">
                                {isLoading ? '...' : stats.total}
                            </span>
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-wide mt-1 uppercase">Total Applications</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-white dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 dark:bg-amber-900/20 rounded-full blur-2xl group-hover:bg-amber-100 transition-colors" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-2xl flex items-center justify-center mb-6">
                                <GraduationCap className="w-6 h-6 text-amber-600" />
                            </div>
                            <span className="text-4xl font-black text-slate-900 dark:text-white">
                                {isLoading ? '...' : stats.interviews}
                            </span>
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-wide mt-1 uppercase">Interviews Scheduled</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-white dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-2xl group-hover:bg-emerald-100 transition-colors" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center mb-6">
                                <Trophy className="w-6 h-6 text-emerald-600" />
                            </div>
                            <span className="text-4xl font-black text-slate-900 dark:text-white">
                                {isLoading ? '...' : stats.offers}
                            </span>
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-wide mt-1 uppercase">Offers Received</p>
                        </div>
                    </motion.div>
                </div>

                {/* Analytics Section */}
                <AnalyticsSection applications={applications} />

                {/* Main Content Areas */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                    {/* Calendar Widget */}
                    <div className="xl:col-span-2">
                        <CalendarWidget userId={userId} />
                    </div>

                    {/* Applications Quick Overview */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-white dark:border-slate-700 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Overview</h3>
                            <div className="space-y-6">
                                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Response Rate</p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                                                style={{ width: stats.total > 0 ? `${((stats.interviews + stats.offers) / stats.total) * 100}%` : '0%' }}
                                            />
                                        </div>
                                        <span className="font-bold text-slate-900 dark:text-white">
                                            {stats.total > 0 ? Math.round(((stats.interviews + stats.offers) / stats.total) * 100) : 0}%
                                        </span>
                                    </div>
                                </div>

                                <div className="text-center py-6">
                                    <p className="text-slate-400 text-sm mb-6">
                                        {stats.total > 0 
                                            ? `Keep track of your journey. You have ${stats.total} application${stats.total === 1 ? '' : 's'} in progress.` 
                                            : "Your journey starts here! Scale your potential by adding your first application."}
                                    </p>
                                    <button 
                                        onClick={() => navigate('/dashboard/applications')}
                                        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-black rounded-2xl hover:shadow-xl hover:shadow-indigo-500/25 transition-all active:scale-95"
                                    >
                                        {stats.total > 0 ? "Manage Applications" : "Add Your First App"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
