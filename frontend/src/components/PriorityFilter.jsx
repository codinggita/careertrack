import React from 'react';

const PriorityFilter = ({ value, onChange }) => {
  const priorities = ['All Priority', 'High', 'Medium', 'Low'];

  return (
    <select
      value={value || 'All Priority'}
      onChange={(e) => onChange(e.target.value === 'All Priority' ? '' : e.target.value)}
      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium"
    >
      {priorities.map((priority) => (
        <option key={priority} value={priority}>
          {priority}
        </option>
      ))}
    </select>
  );
};

export default PriorityFilter;
