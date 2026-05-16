'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowRight, BsLinkedin } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { FaGithubSquare } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';
import { useSectionInView } from '@/lib/hooks';
import avatar from '@/public/avatar.webp';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

function AnimatedText({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className='inline-block mr-[0.25em]'
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Intro() {
  const { ref } = useSectionInView('Home', 0.5);

  return (
    <section
      ref={ref}
      id='home'
      className='mb-12 max-w-[55rem] text-center sm:mb-0 scroll-mt-[100rem]'
    >
      {/* Avatar */}
      <div className='flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, duration: 0.4 }}
        >
          <Image
            className='size-32 rounded-full border-[0.35rem] border-white shadow-xl object-cover object-center'
            src={avatar}
            alt='Moataz Ali'
            width={848}
            height={1080}
            quality={100}
            priority={true}
          />
        </motion.div>
      </div>

      {/* Headline */}
      <motion.div
        className='mb-6 mt-6 px-4'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white sm:text-4xl'>
          <AnimatedText text='Senior Power Platform & Dynamics 365 Developer' />
        </h1>
        <motion.p
          className='mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          I architect enterprise ERP solutions, custom middleware, and full-stack
          applications that automate operations and drive measurable ROI. From
          D365 CE/FO customizations to React/Next.js frontends and NestJS APIs —
          I deliver end-to-end.
        </motion.p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className='flex flex-col items-center justify-center gap-3 px-4 text-base font-medium sm:flex-row sm:gap-4'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Link
          href='#contact'
          className='group flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-white outline-none transition hover:scale-105 hover:bg-gray-950 focus:scale-105 active:scale-105'
        >
          Let&apos;s Talk{' '}
          <BsArrowRight className='opacity-70 transition group-hover:translate-x-1 group-hover:opacity-100' />
        </Link>

        <a
          download
          href='/MoatazAli_Senior_PowerPlatform_Dynamics365_Developer_ATS_CV.pdf'
          className='group flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white px-7 py-3 outline-none transition hover:scale-105 focus:scale-105 active:scale-105 dark:border-white/10 dark:bg-white/10'
        >
          Download CV{' '}
          <HiDownload className='opacity-60 transition group-hover:translate-y-0.5 group-hover:opacity-80' />
        </a>

        <a
          href='#'
          target='_blank'
          className='group flex cursor-pointer items-center gap-2 rounded-full border border-green-600/20 bg-green-50 px-7 py-3 text-green-700 outline-none transition hover:scale-105 hover:bg-green-100 focus:scale-105 active:scale-105 dark:border-green-500/20 dark:bg-green-900/20 dark:text-green-400'
        >
          <SiUpwork className='text-lg' />
          Hire on Upwork
        </a>
      </motion.div>

      {/* Social links */}
      <motion.div
        className='mt-5 flex items-center justify-center gap-3'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <a
          className='flex h-12 w-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white text-gray-700 transition hover:scale-110 hover:text-gray-950 dark:border-white/10 dark:bg-white/10 dark:text-white/60 dark:hover:text-gray-100'
          href='https://www.linkedin.com/in/moo3tazali/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <BsLinkedin />
        </a>
        <a
          className='flex h-12 w-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white text-xl text-gray-700 transition hover:scale-110 hover:text-gray-950 dark:border-white/10 dark:bg-white/10 dark:text-white/60 dark:hover:text-gray-100'
          href='https://github.com/moo3tazali'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}
