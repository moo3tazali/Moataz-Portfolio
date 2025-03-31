'use client';
import React from 'react';
import SectionHeading from './SectionHeading';
import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';

const AboutMe = () => {
  const { ref } = useSectionInView('About');

  return (
    <motion.section
      ref={ref}
      className='mb-28 max-w-[45rem] text-center !leading-8 sm:mb-40 scroll-mt-28'
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.175,
      }}
      id='about'
    >
      <SectionHeading>About Me</SectionHeading>
      <div className='mb-3 text-[15px]'>
        <p className='text-lg leading-relaxed'>
          After five years in the banking sector, I made a
          bold career shift to pursue my passion for
          programming. Over the past two years, I have been
          building high-performance, scalable web
          applications using
          <span className='font-bold'> React</span>,{' '}
          <span className='font-bold'> Next.js</span>, and{' '}
          <span className='font-bold'> TypeScript</span>. My
          background in business has honed my analytical and
          problem-solving skills, which I now apply to
          software development.
        </p>
        <p className='text-lg leading-relaxed mt-4'>
          I specialize in crafting intuitive and
          user-centric interfaces, ensuring seamless
          performance and accessibility. My expertise
          extends to{' '}
          <span className='font-bold'> Redux</span>,{' '}
          <span className='font-bold'> Zustand</span>, and
          other modern state management solutions, allowing
          me to maintain scalable applications efficiently.
        </p>
        <p className='text-lg leading-relaxed mt-4'>
          While my primary focus is on{' '}
          <span className='font-bold'> React</span> and{' '}
          <span className='font-bold'> Next.js</span>, I
          continuously explore emerging technologies. I have
          hands-on experience with{' '}
          <span className='font-bold'> SvelteKit</span>,
          <span className='font-bold'> Vue</span>, and{' '}
          <span className='font-bold'> Angular</span>, and I
          am proficient in integrating frontend applications
          with backend services using{' '}
          <span className='font-bold'> Node.js</span>,{' '}
          <span className='font-bold'> NestJS</span>, and{' '}
          <span className='font-bold'> Prisma</span>.
        </p>
        <p className='text-lg leading-relaxed mt-4'>
          My skill set also includes building{' '}
          <span className='font-bold'> RESTful APIs</span>{' '}
          and working with databases such as
          <span className='font-bold'> MySQL</span>,{' '}
          <span className='font-bold'> PostgreSQL</span>,
          and <span className='font-bold'> MongoDB</span>.
          Ensuring code maintainability and type safety with{' '}
          <span className='font-bold'> TypeScript</span> is
          a core part of my development process.
        </p>
        <p className='text-lg leading-relaxed mt-4'>
          I thrive in dynamic environments where I can
          collaborate with innovative teams to build
          impactful solutions. Beyond coding, I am deeply
          passionate about continuous learning, whether it's
          exploring new frameworks, refining best practices,
          or immersing myself in different cultures and
          perspectives.
        </p>
        <p className='text-lg leading-relaxed mt-4'>
          With a strong commitment to excellence, I am eager
          to contribute my skills to forward-thinking
          projects and drive meaningful innovation in the
          tech space.
        </p>
      </div>
    </motion.section>
  );
};

export default AboutMe;
