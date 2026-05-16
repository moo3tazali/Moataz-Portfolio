'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from './SectionHeading';
import { useSectionInView } from '@/lib/hooks';
import { caseStudiesData } from '@/lib/data';
import { FiExternalLink, FiLock } from 'react-icons/fi';

export default function CaseStudies() {
  const { ref } = useSectionInView('Expertise');

  return (
    <section
      ref={ref}
      id='expertise'
      className='mb-28 max-w-[55rem] scroll-mt-28 sm:mb-40'
    >
      <SectionHeading>Enterprise Case Studies</SectionHeading>
      <p className='mb-10 -mt-4 text-center text-gray-600 dark:text-gray-400 sm:text-lg'>
        A selection of platforms I have architected and built — from
        telemedicine to finance automation.
      </p>

      <div className='flex flex-col gap-8'>
        {caseStudiesData.map((study, index) => (
          <CaseStudyCard key={study.title} study={study} index={index} />
        ))}
      </div>
    </section>
  );
}

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudiesData)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1.2', '1 1'],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const yProgress = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
        y: yProgress,
      }}
      className='group'
    >
      <div className='relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-colors dark:border-white/10 dark:bg-white/5'>
        <div className='flex flex-col md:flex-row'>
          {/* Image side */}
          <div className='relative h-48 w-full overflow-hidden md:h-auto md:w-[40%]'>
            {study.imageUrl ? (
              <Image
                src={study.imageUrl}
                alt={study.title}
                className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
            ) : (
              <div className='flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700'>
                <FiLock className='mb-2 text-3xl text-gray-400 dark:text-gray-500' />
                <span className='text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500'>
                  Private Enterprise
                </span>
              </div>
            )}
            <div className='absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm'>
              {study.industry}
            </div>
          </div>

          {/* Content side */}
          <div className='flex flex-1 flex-col p-6 md:p-8'>
            <div className='mb-3 flex items-start justify-between gap-3'>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                {study.title}
              </h3>
              <a
                href={study.link}
                target={study.link !== '#' ? '_blank' : '_self'}
                rel='noopener noreferrer'
                className='flex shrink-0 items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              >
                {study.status === 'Live Product' ? (
                  <>
                    View <FiExternalLink />
                  </>
                ) : (
                  <>
                    Private <FiLock size={12} />
                  </>
                )}
              </a>
            </div>
            <p className='mb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400'>
              {study.description}
            </p>
            <div className='mt-auto flex flex-wrap gap-2'>
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className='rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
