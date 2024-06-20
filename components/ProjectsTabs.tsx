'use client';
import { useState } from 'react';

import { reactProjectsData, angularProjectsData } from '@/lib/data';
import Project from './Project';

export const ProjectsTabs = () => {
  const [tab, setTab] = useState<'react' | 'angular'>('react');

  return (
    <>
      <div className='flex h-9 items-center justify-center rounded-lg bg-gray-200/70 dark:bg-gray-100/10 p-1 text-muted-foreground min-w-96 max-w-sm mx-auto mb-5 font-medium'>
        <button
          className={`h-full rounded-lg transition text-gray-400 dark:text-white/20 flex-[0.5] ${
            tab === 'react' &&
            'bg-white shadow dark:bg-white/10 !text-black dark:!text-white'
          }`}
          onClick={() => setTab('react')}
        >
          React
        </button>
        <button
          className={`h-full rounded-lg transition text-gray-400 dark:text-white/20  flex-[0.5] ${
            tab === 'angular' &&
            'bg-white shadow dark:bg-white/10 !text-black dark:!text-white'
          }`}
          onClick={() => setTab('angular')}
        >
          Angular
        </button>
      </div>

      {tab === 'react' && (
        <>
          {reactProjectsData.map((project) => (
            <Project key={project.title} {...project} />
          ))}
        </>
      )}

      {tab === 'angular' && (
        <>
          {angularProjectsData.map((project) => (
            <Project key={project.title} {...project} />
          ))}
        </>
      )}
    </>
  );
};
