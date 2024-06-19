import React from 'react';
import { CgWorkAlt } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';
import { LuGraduationCap } from 'react-icons/lu';
import HooBank from '@/public/HooBank.webp';
import Todo from '@/public/Todo.webp';
import Dashboard from '@/public/Dashboard.webp';
import linkedInCloneV1 from '@/public/linkedin-clone v1.webp';
import eCommerceStore from '@/public/eCommerce-Store.webp';
import nextAuth from '@/public/Next-Auth.webp';
import MoviesApp from '@/public/movies-app.webp';
import Amaar from '@/public/Amaar.webp';

export const links = [
  {
    name: 'Home',
    hash: '#home',
  },
  {
    name: 'About',
    hash: '#about',
  },
  {
    name: 'Projects',
    hash: '#projects',
  },
  {
    name: 'Skills',
    hash: '#skills',
  },
  {
    name: 'Experience',
    hash: '#experience',
  },
  {
    name: 'Contact',
    hash: '#contact',
  },
] as const;

export const experiencesData = [
  {
    title: 'Front-End Developer',
    location: 'Alex-EG',
    description:
      "I'm now a junior frontend developer looking for a suitable position. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and more. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: '2023 - present',
  },
  {
    title: 'Banker',
    location: 'Alex-EG',
    description:
      'I worked as a bank employee for 5 years before i decided to leave and shift my whole career into something i love.',
    icon: React.createElement(CgWorkAlt),
    date: '2018 - 2023',
  },
  {
    title: 'Bachelor’s degree',
    location: 'Alexandria University',
    description:
      'I have a bachelor degree in business administration from faculty of commerce English section.',
    icon: React.createElement(LuGraduationCap),
    date: '2017',
  },
] as const;

export const projectsData = [
  {
    title: 'Movies App',
    description:
      'This project is a simple Next React-based movies application built as part of the Vodo company internship task. It displays a list of movies and movie details with the ability to search for a specific movie.',
    tags: [
      'Next',
      'Typescript',
      'Tailwind',
      'Redux toolkit',
      'Context API',
      'axios',
      'Pagination',
      'Lite responsive',
      'SCR API',
      'Search functionality',
      'Movie overview',
    ],
    imageUrl: MoviesApp,
    link: 'https://movies-app-vodo-intern.vercel.app',
  },

  {
    title: 'eCommerce-Store',
    description:
      'Full stack store app build with Next, prisma, supabase db and full functional dashboard. You can find the backend dashboard project on my github.',
    tags: [
      'Next',
      'Tailwind',
      'HeadlessUi',
      'Typescript',
      'Zustand',
      'Next Backend',
      'Prisma',
    ],
    imageUrl: eCommerceStore,
    link: 'https://e-commerce-store-three-pi.vercel.app',
  },
  {
    title: 'Next Auth v5',
    description:
      'This project provides an advanced implementation for Next Auth V5, covering comprehensive features and best practices for integrating authentication in Next.js.',
    tags: [
      'Next',
      'Typescript',
      'Tailwind',
      'Shadcn',
      'Prisma',
      'Credentials Provider',
      'User roles',
      'OAuth Provider',
      'Email verification',
      'Password reset',
      'Protected routes',
    ],
    imageUrl: nextAuth,
    link: 'https://next-auth-red-six.vercel.app',
  },
  {
    title: 'LinkedIn-Clone V1',
    description:
      'This project is a clone of LinkedIn built using React with Vite as the bundler. It aims to replicate some of the core features of LinkedIn, allowing users to view posts from others, interact with likes and comments, and manage their own profiles.',
    tags: [
      'React',
      'Tailwind',
      'MUI',
      'Redux',
      'React form',
      'React Query',
      'Zod',
    ],
    imageUrl: linkedInCloneV1,
    link: 'https://moo3tazali.github.io/linkedin-clone/',
  },
  {
    title: 'Amaar Landing Page',
    description:
      'Amaar Landing Page is a prototype responsive and modern landing page in English and Arabic designed to capture user attention and drive conversions. It is built with modern web technologies and follows best practices for web development.',
    tags: [
      'NextJs',
      'Tailwind',
      'NextI18',
      'FramerMotion',
      'React-hot-toast',
      'Resend',
    ],
    imageUrl: Amaar,
    link: 'https://amaar-kappa.vercel.app/en',
  },
  {
    title: 'Todo App',
    description:
      'React Todo App is built with React.js. It typically features the ability to add, edit, and delete tasks, as well as mark them as complete. Users can interact with a clean, responsive and intuitive interface.',
    tags: ['React', 'Tailwind'],
    imageUrl: Todo,
    link: 'https://moo3tazali.github.io/React-Todo-App/',
  },
  {
    title: 'HooBank',
    description:
      'HooBank website, which is a modern UI/UX website built using React.js and Tailwind CSS. This project is a great example of a modern web application with a clean and responsive design.',
    tags: ['React', 'Tailwind'],
    imageUrl: HooBank,
    link: 'https://moo3tazali.github.io/HooBank/',
  },

  {
    title: 'Dashboard',
    description:
      'Dashboard interface designed to provide users with an overview of key metrics and data points. Typically used to visualize data trends, monitor performance, and make informed decisions based on real-time information.',
    tags: ['HTML', 'CSS', 'Custom CSS Framework'],
    imageUrl: Dashboard,
    link: 'https://moo3tazali.github.io/M-Dashboard/',
  },
] as const;

export const skillsData = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next js',
  'Node js',
  'Git',
  'Github',
  'Tailwind',
  'Shadcn',
  'bootstrap',
  'MUI',
  'Prisma',
  'Redux',
  'Zustand',
  'React Query',
  'React form',
  'Zod',
  'Supabase',
  'Strapi',
  'Framer Motion',
  'Postman',
  'Next Auth v5',
  'Clerk',
  'Kinde',
  'i18next',
] as const;
