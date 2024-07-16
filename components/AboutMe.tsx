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
          Having graduated with a degree in Business Administration and
          subsequently gained five years of valuable experience in the banking
          sector, I decided to pursue my passion for programming. This led me to
          enroll in a coding bootcamp where I immersed myself in front-end web
          development.
        </p>
        <p className='text-lg leading-relaxed mt-4'>
          What truly excites me about programming is the inherent
          problem-solving aspect. I love the feeling of finally figuring out a
          solution to a problem. My core stack is{' '}
          <span className='font-bold'>React</span> and{' '}
          <span className='font-bold'>Next.js</span>. I've cultivated
          proficiency in a range of technologies, including{' '}
          <span className='font-bold'>Svelte</span>,{' '}
          <span className='font-bold'>SvelteKit</span>,{' '}
          <span className='font-bold'>TypeScript</span>, and{' '}
          <span className='font-bold'>Prisma</span>. Additionally, I have a
          solid understanding of <span className='font-bold'>Angular</span>,{' '}
          <span className='font-bold'>Node.js</span>, and{' '}
          <span className='font-bold'>Laravel</span>.
        </p>
        <p className='text-lg leading-relaxed mt-4'>
          I am proficient in building{' '}
          <span className='font-bold'>RESTful APIs</span> with{' '}
          <span className='font-bold'>Next.js</span> and{' '}
          <span className='font-bold'>SvelteKit</span> using{' '}
          <span className='font-bold'>Prisma ORM</span>, connecting to SQL
          databases like <span className='font-bold'>MySQL</span> and{' '}
          <span className='font-bold'>PostgreSQL</span>, or NoSQL databases like{' '}
          <span className='font-bold'>MongoDB</span>.
        </p>
        <p className='text-lg leading-relaxed mt-4'>
          Now, I am eager to leverage my skills as a software developer. I am
          actively seeking a full-time position where I can contribute to
          innovative projects and collaborate with like-minded professionals in
          a dynamic environment. Beyond coding, I am fueled by a passion for
          continuous learning, whether delving into historical narratives or
          exploring different cultures and countries.
        </p>
        <p className='text-lg leading-relaxed mt-4'>
          I approach every challenge with enthusiasm and a commitment to
          excellence, and I am eager to bring this mindset to a forward-thinking
          team.
        </p>
      </div>
    </motion.section>
  );
};

export default AboutMe;
