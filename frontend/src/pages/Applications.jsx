import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Building2, Briefcase, MapPin, Calendar, Trash2, Edit2, Clock, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import * as applicationService from '../services/applicationService';
import AddApplicationModal from '../components/AddApplicationModal';
import StatusFilter from '../components/StatusFilter';
import PriorityFilter from '../components/PriorityFilter';
import SortDropdown from '../components/SortDropdown';
import SkeletonCard from '../components/SkeletonCard';

const statusColors = {
  Applied: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Interview: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Offer: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const priorityColors = {
  High: 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50',
  Medium: 'bg-yellow-50 text-yellow-600 border-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/50',
  Low: 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50',
};

const Applications = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  // Filter & Pagination state
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    sort: 'dateApplied_desc',
    page: 1,
    limit: 6
  });
  const [totalPages, setTotalPages] = useState(1);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const userId = currentUser.id || currentUser._id;
      const data = await applicationService.getApplications(userId, filters);
      setApplications(data.applications || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleAddOrUpdate = async (formData) => {
    try {
      if (editingApp) {
        await applicationService.updateApplication(editingApp._id, formData);
      } else {
        await applicationService.createApplication({ 
          ...formData, 
          userId: currentUser.id || currentUser._id 
        });
      }
      fetchApplications();
    } catch (error) {
      console.error('Error saving application:', error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await applicationService.deleteApplication(id);
        toast.success('Application deleted successfully');
        fetchApplications();
      } catch (error) {
        console.error('Failed to delete application:', error);
        toast.error('Failed to delete application');
      }
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-10 transition-colors duration-500">
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
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                My Applications
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">
              Manage and track your internship application status in one place.
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setEditingApp(null);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black shadow-xl shadow-indigo-200 dark:shadow-none transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Application</span>
          </motion.button>
        </motion.div>

        {/* Toolbar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white dark:border-slate-700 flex flex-wrap items-center gap-6 transition-all duration-300"
        >
          <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by company or role..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <StatusFilter value={filters.status} onChange={(val) => handleFilterChange('status', val)} />
            <PriorityFilter value={filters.priority} onChange={(val) => handleFilterChange('priority', val)} />
            <SortDropdown value={filters.sort} onChange={(val) => handleFilterChange('sort', val)} />
          </div>
        </motion.div>

        {/* Grid Layout */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl flex items-center justify-center mb-6">
              <Briefcase className="w-10 h-10 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {filters.search || filters.status || filters.priority ? "Zero matches found" : "No applications yet"}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm px-4 italic">
              {filters.search || filters.status || filters.priority ? "Try adjusting your filters to find what you're looking for." : "Your career journey is just a click away. Start by adding your first application."}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-12">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {applications.map(app => (
                <motion.div
                  key={app._id}
                  variants={item}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-white dark:border-slate-700 hover:shadow-2xl transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-inner">
                      <Building2 className="w-7 h-7 text-indigo-500" />
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                      <button
                        onClick={() => {
                          setEditingApp(app);
                          setIsModalOpen(true);
                        }}
                        className="p-2.5 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-xl text-slate-500 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-600 transition-all font-bold"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="p-2.5 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-xl text-rose-500 transition-all shadow-sm border border-rose-100 dark:border-rose-900/30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 relative z-10">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white line-clamp-1 tracking-tight">{app.companyName}</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-indigo-600" /> {app.role}
                    </p>
                    {app.location && (
                      <p className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-2 text-xs">
                        <MapPin className="w-4 h-4" /> {app.location}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6 relative z-10">
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider ${statusColors[app.status]}`}>
                      {app.status}
                    </span>
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border ${priorityColors[app.priority]}`}>
                      {app.priority}
                    </span>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between text-[11px] font-bold text-slate-400 relative z-10">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <Clock className="w-3 h-3 text-indigo-500" /> 
                      Applied {new Date(app.dateApplied).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    {app.interviewDate && (
                      <span className="text-indigo-600 italic">Interview Scheduled</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  disabled={filters.page === 1}
                  onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setFilters(prev => ({ ...prev, page: i + 1 }))}
                      className={`w-12 h-12 rounded-2xl font-black text-sm transition-all shadow-md ${
                        filters.page === i + 1
                          ? 'bg-indigo-600 text-white shadow-indigo-200 dark:shadow-none scale-110'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={filters.page === totalPages}
                  onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        )}

        <AddApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddOrUpdate}
          initialData={editingApp}
        />
      </div>
    </div>
  );
};

export default Applications;
