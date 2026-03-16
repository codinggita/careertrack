import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const SortDropdown = ({ value, onChange }) => {
  const options = [
    { label: 'Newest First', value: 'dateApplied_desc' },
    { label: 'Oldest First', value: 'dateApplied_asc' },
    { label: 'Company (A-Z)', value: 'company_asc' },
    { label: 'Company (Z-A)', value: 'company_desc' },
  ];

  return (
    <div className="relative flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-slate-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium pr-8 appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 pointer-events-none">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default SortDropdown;
