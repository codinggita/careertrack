import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Building2, Briefcase, MapPin, Calendar, Trash2, Edit2, Clock, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as applicationService from '../services/applicationService';
import AddApplicationModal from '../components/AddApplicationModal';
import StatusFilter from '../components/StatusFilter';
import PriorityFilter from '../components/PriorityFilter';
import SortDropdown from '../components/SortDropdown';

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
        fetchApplications();
      } catch (error) {
        console.error('Failed to delete application:', error);
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
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Applications</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and track your internship application status in one place.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditingApp(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Application</span>
        </motion.button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search company or role..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
          />
        </div>
        <StatusFilter value={filters.status} onChange={(val) => handleFilterChange('status', val)} />
        <PriorityFilter value={filters.priority} onChange={(val) => handleFilterChange('priority', val)} />
        <SortDropdown value={filters.sort} onChange={(val) => handleFilterChange('sort', val)} />
      </div>

      {/* Grid Layout */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : applications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mb-4">
            <Briefcase className="w-10 h-10 text-indigo-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {filters.search || filters.status || filters.priority ? "No matches found" : "No applications yet"}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs">
            {filters.search || filters.status || filters.priority ? "Adjust your filters to see more applications." : "Start your journey by adding your first internship application."}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {applications.map(app => (
              <motion.div
                key={app._id}
                variants={item}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all relative group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700">
                    <Building2 className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingApp(app);
                        setIsModalOpen(true);
                      }}
                      className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{app.companyName}</h3>
                  <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4" /> {app.role}
                  </p>
                  {app.location && (
                    <p className="text-slate-400 dark:text-slate-500 flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" /> {app.location}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${priorityColors[app.priority]}`}>
                    {app.priority} Priority
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 
                    Applied {new Date(app.dateApplied).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                disabled={filters.page === 1}
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setFilters(prev => ({ ...prev, page: i + 1 }))}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                      filters.page === i + 1
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={filters.page === totalPages}
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
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
  );
};

export default Applications;
