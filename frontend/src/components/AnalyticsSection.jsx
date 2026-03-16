import React, { useMemo } from 'react';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList
} from 'recharts';
import { motion } from 'framer-motion';
import { PieChart as PieIcon, BarChart3, TrendingUp, Filter } from 'lucide-react';

const COLORS = {
    Applied: '#6366f1', // Indigo
    Interview: '#f59e0b', // Amber
    Offer: '#10b981', // Emerald
    Rejected: '#ef4444' // Rose
};

const AnalyticsSection = ({ applications }) => {
    // 1. Applications by Status
    const statusData = useMemo(() => {
        const counts = applications.reduce((acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(counts).map(status => ({
            name: status,
            value: counts[status],
            color: COLORS[status] || '#94a3b8'
        }));
    }, [applications]);

    // 2. Applications Per Month
    const monthlyData = useMemo(() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const data = months.map(m => ({ name: m, count: 0 }));
        
        applications.forEach(app => {
            const date = new Date(app.dateApplied);
            const monthIdx = date.getMonth();
            data[monthIdx].count += 1;
        });

        // Filter out months with zero counts to keep it clean, or keep last 6 months
        const currentMonth = new Date().getMonth();
        return data.slice(Math.max(0, currentMonth - 5), currentMonth + 1);
    }, [applications]);

    // 3. Interview Conversion Rate
    const conversionData = useMemo(() => {
        const total = applications.length;
        const interviews = applications.filter(a => a.status === 'Interview' || a.status === 'Offer' || a.status === 'Rejected').length; // Assuming these reached interview stage or similar
        // Actually, more accurate:
        const interviewCount = applications.filter(a => a.interviewDate).length;
        const offerCount = applications.filter(a => a.status === 'Offer').length;

        return [
            { name: 'Total Apps', value: total, color: '#6366f1' },
            { name: 'Interviews', value: interviewCount, color: '#f59e0b' },
            { name: 'Offers', value: offerCount, color: '#10b981' }
        ];
    }, [applications]);

    if (applications.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-xl border border-slate-100 dark:border-slate-700 text-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-800">
                    <Filter className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">No analytics data yet</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Start adding internship applications to see your progress visualized.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Status Chart */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden"
            >
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <PieIcon className="w-4 h-4 text-indigo-500" /> Applications by Status
                </h4>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                itemStyle={{ fontWeight: 'bold' }}
                            />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Monthly Trends */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden"
            >
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-amber-500" /> Monthly Trends
                </h4>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} 
                            />
                            <YAxis hide />
                            <Tooltip 
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="count" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={30}>
                                <LabelList dataKey="count" position="top" style={{ fontSize: 10, fontWeight: 800, fill: '#6366f1' }} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Conversion Funnel */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden"
            >
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" /> Success Metrics
                </h4>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={conversionData}
                                cx="50%"
                                cy="50%"
                                innerRadius={0}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {conversionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                            />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
};

export default AnalyticsSection;
