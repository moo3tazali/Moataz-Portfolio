'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { angularProjectsData, reactProjectsData } from '@/lib/data';
import { FaGithubSquare } from 'react-icons/fa';

type ProjectProps = (
  | typeof reactProjectsData
  | typeof angularProjectsData
)[number];
const Project = ({
  title,
  description,
  tags,
  imageUrl,
  link,
  github,
}: ProjectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className='group mb-3 sm:mb-8 last:mb-0'
    >
      <section className='bg-gray-100 max-w-[45rem] border border-black/5 rounded-lg overflow-hidden md:pr-8 relative md:h-[20rem] hover:bg-gray-200 transition md:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20'>
        <div className='relative md:static max-w-full'>
          <Image
            src={imageUrl}
            alt='My Projects'
            quality={95}
            className='w-full object-cover md:absolute md:top-8 md:-right-40 md:w-[28.25rem] rounded-t-lg shadow-2xl transition group-hover:md:scale-[1.04] group-hover:md:-translate-x-3 group-hover:md:translate-y-3 group-hover:md:-rotate-2 group-even:group-hover:md:translate-x-3 group-even:group-hover:md:translate-y-3 group-even:group-hover:md:rotate-2 group-even:md:right-[initial] group-even:md:-left-40'
          />

          <a
            href={link}
            target='_blank'
            className='absolute top-0 right-0 hidden group-hover:flex md:top-8 md:-right-40 w-full md:w-[29rem] h-full rounded-t-lg shadow-2xl transition group-hover:md:scale-[1.04] group-hover:md:-translate-x-3 group-hover:md:translate-y-3 group-hover:md:-rotate-2 group-even:group-hover:md:translate-x-3 group-even:group-hover:md:translate-y-3 group-even:group-hover:md:rotate-2 group-even:md:right-[initial] group-even:md:-left-40 bg-black/30  justify-center items-center text-xl group-odd:md:pr-40 group-even:md:pl-40 text-white/80 italic cursor-pointer'
          >
            Live preview
          </a>
        </div>
        <div className='pt-4 pb-7 px-5 md:pl-10 md:pr-2 md:pt-10 md:max-w-[60%] flex flex-col h-full md:group-even:ml-[18rem]'>
          <div className='flex items-center gap-x-5'>
            <h3 className='text-2xl font-semibold'>{title}</h3>
            <a
              className='bg-white w-10 h-10 text-gray-700 flex justify-center items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.05] hover:scale-[1.05] hover:text-gray-950 active:scale-105 transition cursor-pointer  borderBlack dark:bg-white/10 dark:text-white/60 dark:hover:text-gray-100'
              href={github}
              target='_blank'
            >
              <FaGithubSquare />
            </a>
          </div>
          <p className='mt-2 w-full leading-[1.5] text-sm text-gray-700 dark:text-white/70'>
            {description}
          </p>
          <ul className='flex flex-wrap mt-4 gap-1 md:mt-auto'>
            {tags.map((tag, index) => (
              <li
                className='bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70'
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </motion.div>
  );
};

export default Project;
