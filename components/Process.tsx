'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { useSectionInView } from '@/lib/hooks';
import { processSteps } from '@/lib/data';

export default function Process() {
  const { ref } = useSectionInView('Process');

  return (
    <section
      ref={ref}
      id='process'
      className='mb-28 max-w-[60rem] scroll-mt-28 sm:mb-40'
    >
      <SectionHeading>How We Work Together</SectionHeading>
      <p className='mb-12 -mt-4 text-center text-gray-600 dark:text-gray-400 sm:text-lg'>
        A transparent, iterative process designed to deliver results — not just
        code.
      </p>

      <div className='relative'>
        {/* Connecting line — desktop */}
        <div className='absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-gray-200 via-gray-300 to-transparent dark:from-gray-700 dark:via-gray-600 md:left-1/2 md:block md:-translate-x-px' />

        <div className='space-y-10 md:space-y-14'>
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.step}
              step={step}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
  isLeft,
}: {
  step: (typeof processSteps)[number];
  index: number;
  isLeft: boolean;
}) {
  return (
    <motion.div
      className={`relative flex items-center gap-6 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Number circle — mobile left, desktop center */}
      <div className='relative z-10 flex shrink-0 items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2'>
        <motion.div
          className='flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-lg font-bold text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white'
          whileHover={{ scale: 1.1, borderColor: '#6366f1' }}
          transition={{ duration: 0.2 }}
        >
          {step.step}
        </motion.div>
      </div>

      {/* Content card */}
      <div
        className={`flex-1 md:w-[45%] ${
          isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
        }`}
      >
        <motion.div
          className='rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-colors dark:border-white/10 dark:bg-white/5'
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className='mb-2 text-lg font-bold text-gray-900 dark:text-white'>
            {step.title}
          </h3>
          <p className='text-sm leading-relaxed text-gray-600 dark:text-gray-400'>
            {step.description}
          </p>
        </motion.div>
      </div>

      {/* Spacer for opposite side on desktop */}
      <div className='hidden md:block md:w-[45%]' />
    </motion.div>
  );
}
