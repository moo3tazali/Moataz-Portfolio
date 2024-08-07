'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArrowRight, BsLinkedin } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import { FaGithubSquare } from 'react-icons/fa';
import { useSectionInView } from '@/lib/hooks';
import avatar from '@/public/avatar.webp';
const Intro = () => {
  const { ref } = useSectionInView('Home', 0.5);

  return (
    <section
      ref={ref}
      id='home'
      className='mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]'
    >
      {/* Avatar */}
      <div className='flex items justify-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'tween', duration: 0.2 }}
        >
          <Image
            className='h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl'
            src={avatar}
            alt='Moataz avatar'
            width={192}
            height={192}
            quality={95}
            priority={true}
          />
        </motion.div>
      </div>

      {/* text */}
      <motion.h1
        className='mb-10 mt-4 px-4 !text-2xl font-medium !leading-[1.5] sm:text-4xl'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className='text-2xl font-bold mb-4'>Hello, I'm Moataz Ali</h1>
          <p className='text-lg leading-relaxed'>
            As a <span className='font-bold'>Junior FrontEnd Developer</span>{' '}
            with a passion for{' '}
            <span className='font-bold'>learning and growth</span>, I thrive on
            creating meaningful web experiences. My journey in web development
            is centered around{' '}
            <span className='font-bold'>React (Next.js)</span> and{' '}
            <span className='font-bold'>Svelte (SvelteKit)</span>.
          </p>
          <p className='text-lg leading-relaxed mt-4'>
            My core languages are <span className='font-bold'>JavaScript</span>{' '}
            and <span className='font-bold'>PHP</span>. I have a solid
            understanding of <span className='font-bold'>Angular</span>,{' '}
            <span className='font-bold'>Node.js</span>, and{' '}
            <span className='font-bold'>Laravel</span>, which complements my
            frontend expertise.
          </p>
          <p className='text-lg leading-relaxed mt-4'>
            I am proficient in building{' '}
            <span className='font-bold'>RESTful APIs</span> with{' '}
            <span className='font-bold'>Next.js</span> and{' '}
            <span className='font-bold'>SvelteKit</span> using{' '}
            <span className='font-bold'>Prisma ORM</span>. Whether it's
            connecting to SQL databases like{' '}
            <span className='font-bold'>MySQL</span> or{' '}
            <span className='font-bold'>PostgreSQL</span>, or NoSQL databases
            like <span className='font-bold'>MongoDB</span>, I have the skills
            to bring your project to life.
          </p>
        </div>
      </motion.h1>

      <motion.div
        className='flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-lg font-medium'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href='#contact'
          className='group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 hover:bg-gray-950 active:scale-105 transition'
        >
          Contact me here{' '}
          <BsArrowRight className='opacity-70 group-hover:opacity-80 group-hover:translate-x-1 transition' />
        </Link>
        <a
          download
          href='/MoatazAli_Frontend_Developer_1y_Exp_CV.pdf'
          className='group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10'
        >
          Download CV{' '}
          <HiDownload className='opacity-60 group-hover:translate-y-0.5 group-hover:opacity-80 transition' />
        </a>
        <div className='flex gap-4'>
          <a
            className='bg-white w-14 h-14 text-gray-700 hover:text-gray-950 flex items-center justify-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60 dark:hover:text-gray-100'
            href='https://www.linkedin.com/in/moo3tazali/'
            target='_blank'
          >
            <BsLinkedin />
          </a>

          <a
            className='bg-white w-14 h-14 text-gray-700 flex justify-center items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer  borderBlack dark:bg-white/10 dark:text-white/60 dark:hover:text-gray-100'
            href='https://github.com/moo3tazali'
            target='_blank'
          >
            <FaGithubSquare />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Intro;
