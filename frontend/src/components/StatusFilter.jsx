import React from 'react';

const StatusFilter = ({ value, onChange }) => {
  const statuses = ['All Status', 'Applied', 'Interview', 'Offer', 'Rejected'];

  return (
    <select
      value={value || 'All Status'}
      onChange={(e) => onChange(e.target.value === 'All Status' ? '' : e.target.value)}
      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium"
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
};

export default StatusFilter;
