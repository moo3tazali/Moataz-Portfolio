'use client';

import React from 'react';
import SectionHeading from './SectionHeading';
import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';
import { servicesData } from '@/lib/data';
import {
  FaServer,
  FaNetworkWired,
  FaBolt,
  FaLaptopCode,
  FaCogs,
  FaUserTie,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  D365: FaServer,
  ERP: FaNetworkWired,
  Power: FaBolt,
  Web: FaLaptopCode,
  Auto: FaCogs,
  Consult: FaUserTie,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function WhatICanDo() {
  const { ref } = useSectionInView('Services');

  return (
    <section
      ref={ref}
      id='services'
      className='mb-28 max-w-[60rem] scroll-mt-28 text-center sm:mb-40'
    >
      <SectionHeading>What I Can Do For You</SectionHeading>
      <p className='mb-10 -mt-4 max-w-[42rem] text-gray-600 dark:text-gray-400 sm:text-lg'>
        I don&apos;t just write code — I solve business problems. From ERP
        customization to full-stack platforms, here is how I help organizations
        scale.
      </p>

      <motion.div
        className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-80px' }}
      >
        {servicesData.map((service) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              className='group relative rounded-2xl border border-black/5 bg-white p-6 text-left shadow-sm transition-colors dark:border-white/10 dark:bg-white/5 sm:p-8'
            >
              <div className='mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 p-3 text-2xl text-gray-700 transition-transform group-hover:scale-110 dark:from-gray-800 dark:to-gray-700 dark:text-gray-200'>
                {Icon && <Icon />}
              </div>
              <h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>
                {service.title}
              </h3>
              <p className='text-sm leading-relaxed text-gray-600 dark:text-gray-400'>
                {service.description}
              </p>
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100' />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
