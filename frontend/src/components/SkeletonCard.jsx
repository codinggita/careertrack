import React from 'react';

const SkeletonCard = ({ variant = 'card', className = '' }) => {
  const baseClass = "bg-slate-200 dark:bg-slate-700 animate-pulse rounded-2xl";

  if (variant === 'stat') {
    return (
      <div className={`p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-white dark:border-slate-700 flex flex-col gap-4 ${className}`}>
        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-2xl animate-pulse" />
        <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (variant === 'notification') {
    return (
      <div className={`p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col gap-3 ${className}`}>
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
          <div className="h-4 w-8 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>
        <div className="mt-2 flex justify-between">
          <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-3 w-12 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className={`bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-700 h-[350px] flex flex-col gap-6 ${className}`}>
        <div className="h-6 w-1/3 bg-slate-100 dark:bg-slate-900 rounded-lg animate-pulse" />
        <div className="flex-1 w-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (variant === 'calendar') {
    return (
      <div className={`bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-white dark:border-slate-700 h-full flex flex-col gap-6 ${className}`}>
        <div className="h-6 w-1/4 bg-slate-100 dark:bg-slate-900 rounded-lg animate-pulse" />
        <div className="flex-1 grid grid-cols-7 gap-2">
          {[...Array(35)].map((_, i) => (
            <div key={i} className="aspect-square bg-slate-50 dark:bg-slate-900/50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Default: Application Card
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-white dark:border-slate-700 h-64 flex flex-col gap-4 ${className}`}>
      <div className="flex justify-between items-start">
        <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-2xl animate-pulse" />
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
      </div>
      <div className="mt-auto flex gap-2">
        <div className="h-8 w-20 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
        <div className="h-8 w-20 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
      </div>
    </div>
  );
};

export default SkeletonCard;
