import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as applicationService from '../services/applicationService';

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        interviews: 0,
        offers: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userId = currentUser.id || currentUser._id;
                const data = await applicationService.getApplications(userId, { limit: 1000 });
                const apps = data.applications || [];
                
                setStats({
                    total: apps.length,
                    interviews: apps.filter(a => a.status === 'Interview').length,
                    offers: apps.filter(a => a.status === 'Offer').length
                });
            } catch (err) {
                console.error('Failed to fetch dashboard stats:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (currentUser) {
            fetchStats();
        }
    }, [currentUser]);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
            >
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome, {currentUser?.name}!</h1>
                        <p className="text-gray-500">Here's an overview of your internship applications.</p>
                    </div>
                    <button 
                        onClick={logout}
                        className="px-6 py-2 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div 
                        onClick={() => navigate('/dashboard/applications')}
                        className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 cursor-pointer hover:shadow-md transition-all"
                    >
                        <span className="text-indigo-600 font-bold text-2xl">
                            {isLoading ? '...' : stats.total}
                        </span>
                        <p className="text-gray-600 text-sm">Applications</p>
                    </div>
                    <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
                        <span className="text-purple-600 font-bold text-2xl">
                            {isLoading ? '...' : stats.interviews}
                        </span>
                        <p className="text-gray-600 text-sm">Interviews</p>
                    </div>
                    <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100">
                        <span className="text-pink-600 font-bold text-2xl">
                            {isLoading ? '...' : stats.offers}
                        </span>
                        <p className="text-gray-600 text-sm">Offers</p>
                    </div>
                </div>

                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400">
                        {stats.total > 0 
                            ? `You have ${stats.total} application${stats.total === 1 ? '' : 's'}. Manage them in the Applications page.` 
                            : "No applications found. Click below to add your first one!"}
                    </p>
                    <button 
                        onClick={() => navigate('/dashboard/applications')}
                        className="mt-4 px-6 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                        {stats.total > 0 ? "View All Applications" : "Go to Applications"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
