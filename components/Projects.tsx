'use client';
import React from 'react';
import SectionHeading from './SectionHeading';

import { useSectionInView } from '@/lib/hooks';
import { ProjectsTabs } from './ProjectsTabs';

const Projects = () => {
  const { ref } = useSectionInView('Projects', 0.5);

  return (
    <section ref={ref} id='projects' className='scroll-mt-28 mb-28'>
      <SectionHeading>Projects</SectionHeading>
      <ProjectsTabs />
    </section>
  );
};

export default Projects;
