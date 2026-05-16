'use client';

import React from 'react';
import SectionHeading from './SectionHeading';
import { experiencesData } from '@/lib/data';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useSectionInView } from '@/lib/hooks';
import { useTheme } from '@/context/themeContext';

export default function Experience() {
  const { ref, inView } = useSectionInView('Experience', 0.1);
  const { theme } = useTheme();

  return (
    <section
      ref={ref}
      id='experience'
      className='scroll-mt-28 mb-28 sm:mb-40'
    >
      <SectionHeading>My Journey</SectionHeading>
      <VerticalTimeline lineColor=''>
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === 'light'
                    ? '#f3f4f6'
                    : 'rgba(255, 255, 255, 0.05)',
                boxShadow: 'none',
                border: '1px solid rgba(0,0,0,0.05)',
                textAlign: 'left',
                padding: '1.3rem 2rem',
                borderRadius: '1rem',
              }}
              contentArrowStyle={{
                borderRight:
                  theme === 'light'
                    ? '0.4rem solid #9ca3af'
                    : '0.4rem solid rgba(255, 255, 255, 0.5)',
              }}
              date={item.date}
              icon={item.icon}
              iconStyle={{
                background:
                  theme === 'light'
                    ? 'white'
                    : 'rgba(255, 255, 255, 0.15)',
                fontSize: '1.5rem',
                boxShadow:
                  theme === 'light'
                    ? '0 0 0 4px #e5e7eb'
                    : '0 0 0 4px rgba(255,255,255,0.1)',
              }}
              visible={inView}
            >
              <h3 className='font-bold capitalize text-gray-900 dark:text-white'>
                {item.title}
              </h3>
              <p className='font-medium !mt-1 text-sm text-gray-500 dark:text-gray-400'>
                {item.location}
              </p>
              <p className='!mt-2 !font-normal text-sm leading-relaxed text-gray-700 dark:text-white/75'>
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
