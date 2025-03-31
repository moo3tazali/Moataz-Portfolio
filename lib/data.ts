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
import EasyTasks from '@/public/easy-tasks.webp';
import NestJS from '@/public/nestjs.webp';
import Spectra from '@/public/spectra.webp';

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
    title: 'Frontend Web Developer',
    location: 'Profound | Alex, Egypt',
    description:
      'Developing and optimizing high-performance Next.js applications, ensuring 90+ Lighthouse scores in performance and accessibility. Building dynamic, interactive user interfaces with a strong focus on UI/UX best practices to enhance user experience. Integrating and consuming RESTful APIs and WebSockets, streamlining real-time data ow between frontend and backend services. Implementing performance optimizations, lazy loading, and code splitting to improve efciency and scalability. Enhancing application security and authentication using Next middleware and JWT, ensuring secure user access and data protection. Collaborating closely with designers and backend developers in an agile environment to deliver seamless and responsive applications.',
    icon: React.createElement(FaReact),
    date: '07/2024 - present',
  },
  {
    title: 'Frontend Web Developer ',
    location: 'Freelance | Alex, Egypt',
    description:
      'Built and deployed personal and freelance projects using Next.js, React, and TypeScript to strengthen my frontend expertise. Developed full-stack applications, integrating RESTful and GraphQL APIs while ensuring efcient state management with Redux and Zustand. Optimized application performance using lazy loading, code splitting, and caching strategies for enhanced speed and scalability. Explored advanced UI/UX principles, accessibility standards, and responsive design techniques to create intuitive user experiences. Implemented authentication and authorization ows using NextAuth and JWT, enhancing security in web applications. Collaborated with developers and designers on open-source and side projects, gaining hands-on experience in agile workows and best practices.',
    icon: React.createElement(FaReact),
    date: '11/2023 - 07/2024',
  },
  {
    title: 'Banker',
    location: 'Banque Misr | Alex, Egypt',
    description:
      'Managed nancial transactions, customer accounts, and provided tailored banking solutions to enhance client satisfaction. Developed strong analytical and problem-solving skills, which later helped in transitioning to a tech career in web development.',
    icon: React.createElement(CgWorkAlt),
    date: '04/2018 - 09/2023',
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

export const back = [
  {
    title: 'Tasks App',
    description:
      'A task management API built with NestJS, TypeScript, and PostgreSQL. It provides features for user authentication, permissions, task creation, updates, and deletion with a well-documented Swagger UI.',
    tags: [
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'Task Management',
      'REST API',
    ],
    imageUrl: NestJS,
    link: 'https://task-board-production.up.railway.app',
    github: 'https://github.com/moo3tazali/task-board',
  },
] as const;

export const front = [
  {
    title: 'Spectra App',
    description:
      'A web platform bridging people with disabilities and healthcare services. Built with .NET Core (backend) and Next.js (frontend) for a scalable, accessible experience.',
    tags: [
      'NextJs',
      'Tailwind',
      'NextI18',
      'Tanstack Query',
      'VideoSDK',
      'SignalR',
    ],
    imageUrl: Spectra,
    link: 'https://www.spectra.sa/en',
    github: '#',
  },
  {
    title: 'Easy Tasks',
    description:
      'This project is a basic to-do application built with Angular V18.',
    tags: [
      'Angular',
      'Typescript',
      'Responsive design',
      'Add new tasks',
      'Delete tasks',
      'Mark tasks as completed',
    ],
    imageUrl: EasyTasks,
    link: 'https://easy-task-angular-6db17.web.app',
    github:
      'https://github.com/moo3tazali/Easy-Tasks-Angular',
  },
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
    github:
      'https://github.com/moo3tazali/movies-app-vodo-intern',
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
    github: 'https://github.com/moo3tazali/eCommerce-Store',
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
    github: 'https://github.com/moo3tazali/next-auth',
  },
  {
    title: 'LinkedIn-Clone V1',
    description:
      'This project is a clone of LinkedIn built using React with Vite as the frontend and Sveltekit as the backend. It aims to replicate some of the core features of LinkedIn, allowing users to view posts from others, interact with likes and comments, and manage their own profiles.',
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
    link: 'https://linkedin-clone-one-umber.vercel.app',
    github: 'https://github.com/moo3tazali/linkedin-clone',
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
    github:
      'https://github.com/moo3tazali/Amaar-landingPage',
  },
  {
    title: 'Todo App',
    description:
      'React Todo App is built with React.js. It typically features the ability to add, edit, and delete tasks, as well as mark them as complete. Users can interact with a clean, responsive and intuitive interface.',
    tags: ['React', 'Tailwind'],
    imageUrl: Todo,
    link: 'https://moo3tazali.github.io/React-Todo-App/',
    github: 'https://github.com/moo3tazali/React-Todo-App',
  },
  {
    title: 'HooBank',
    description:
      'HooBank website, which is a modern UI/UX website built using React.js and Tailwind CSS. This project is a great example of a modern web application with a clean and responsive design.',
    tags: ['React', 'Tailwind'],
    imageUrl: HooBank,
    link: 'https://moo3tazali.github.io/HooBank/',
    github: 'https://github.com/moo3tazali/HooBank',
  },

  {
    title: 'Dashboard',
    description:
      'Dashboard interface designed to provide users with an overview of key metrics and data points. Typically used to visualize data trends, monitor performance, and make informed decisions based on real-time information.',
    tags: ['HTML', 'CSS', 'Custom CSS Framework'],
    imageUrl: Dashboard,
    link: 'https://moo3tazali.github.io/M-Dashboard/',
    github: 'https://github.com/moo3tazali/M-Dashboard',
  },
] as const;

export const skillsData = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next js',
  'Svelte',
  'SvelteKit',
  'Node js',
  'NestJS',
  'Git',
  'Github',
  'Tailwind',
  'Shadcn',
  'Mantine',
  'bootstrap',
  'MUI',
  'Prisma',
  'Redux',
  'Zustand',
  'Tanstack Query',
  'React form',
  'Formik',
  'Zod',
  'Framer Motion',
  'Postman',
  'Swagger',
  'Vercel',
  'Next Auth v5',
  'Clerk',
  'Kinde',
  'i18next',
] as const;
