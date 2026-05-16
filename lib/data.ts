import React from 'react';
import { CgWorkAlt } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';
import { LuGraduationCap } from 'react-icons/lu';
import { FaBriefcase } from 'react-icons/fa';
import Spectra from '@/public/spectra.webp';

export const links = [
  { name: 'Home', hash: '#home' },
  { name: 'Services', hash: '#services' },
  { name: 'Expertise', hash: '#expertise' },
  { name: 'Skills', hash: '#skills' },
  { name: 'Process', hash: '#process' },
  { name: 'Experience', hash: '#experience' },
  { name: 'Contact', hash: '#contact' },
] as const;

export const statsData = [
  { label: 'Years in Tech', value: 5, suffix: '+' },
  { label: 'Enterprise Platforms', value: 4, suffix: '' },
  { label: 'Industries Served', value: 3, suffix: '' },
  { label: 'End-to-End Projects', value: 100, suffix: '%' },
] as const;

export const servicesData = [
  {
    title: 'Dynamics 365 Development',
    description:
      'Full-stack customizations for D365 CE & FO — model-driven apps, Dataverse plugins, C# platform extensions, web resources, and OData integrations tailored to your business rules.',
    icon: 'D365',
  },
  {
    title: 'ERP Integration & Middleware',
    description:
      'Build robust middleware to bridge legacy systems (ICT, spreadsheets) with D365 FO. Automate batch posting, master-data sync, and financial dimension mapping with NestJS, BullMQ, and Redis pipelines.',
    icon: 'ERP',
  },
  {
    title: 'Power Platform Solutions',
    description:
      'End-to-end Power Apps, Power Automate flows, and business process automation. Streamline approvals, procurement, inventory, and operational workflows with low-code + pro-code hybrid architecture.',
    icon: 'Power',
  },
  {
    title: 'Full-Stack Web Development',
    description:
      'Enterprise React/Next.js frontends with real-time features (SignalR, VideoSDK), multi-role dashboards, i18n/RTL support, and seamless RESTful API integration with NestJS/Node backends.',
    icon: 'Web',
  },
  {
    title: 'Process Automation',
    description:
      'Replace manual data entry with automated pipelines. My D365FO middleware alone reduced manual work by ~85–95%, turning multi-day Excel re-keying into validated batch jobs with full error reporting.',
    icon: 'Auto',
  },
  {
    title: 'Technical Consulting',
    description:
      'Architecture design, stakeholder workshops, ALM strategy, and code reviews. I translate complex finance/logistics/healthcare requirements into scalable technical solutions with clear documentation.',
    icon: 'Consult',
  },
] as const;

export const caseStudiesData = [
  {
    title: 'Spectra — Telemedicine Platform',
    industry: 'Healthcare',
    description:
      'Built a bilingual (Arabic/English) telemedicine frontend on Next.js 14 App Router for pediatric developmental care. Delivered four role-based dashboards (Admin, Doctor, Organization, Client), real-time notifications/chat via SignalR, VideoSDK teleconsultation rooms, contract & revenue-share workflows, early-check assessments, and a public marketing/booking surface — all with full RTL support.',
    tags: [
      'Next.js 14',
      'SignalR',
      'VideoSDK',
      'TanStack Query',
      'Zod',
      'Mantine',
      'RTL/i18n',
      'Multi-role UX',
    ],
    imageUrl: Spectra,
    link: 'https://www.spectra.sa/en',
    status: 'Live Product',
  },
  {
    title: 'D365FO Middleware — Finance Integration',
    industry: 'Finance / Freight',
    description:
      'Sole full-stack delivery of an ICT-to-D365 FO migration middleware for MESCO finance teams. A NestJS 11 API ingests Excel exports, validates against cached master data, transforms through 16+ entry processors, and posts to D365 FO via OData. Includes a React 19 dashboard for upload, error review, and batch orchestration across AR, AP, cash, vendor, and closing modules.',
    tags: [
      'NestJS 11',
      'D365 FO',
      'OData',
      'BullMQ',
      'Redis',
      'MongoDB',
      'React 19',
      'CQRS',
    ],
    imageUrl: undefined,
    link: '#',
    status: 'Private Enterprise',
  },
  {
    title: 'MG Operation — Logistics Operations',
    industry: 'Logistics / Freight',
    description:
      'End-to-end freight-forwarding & logistics system on D365 CE/Dataverse, extended with a NestJS 11 API. Built a shared TypeScript Dataverse/XRM client library (browser + server), 14 React HTML web resources, 25+ shipping/finance PDF templates (@react-pdf/renderer), and D365 FO connectors — covering quotation → operation, cost/sales grids, invoicing, payment requests, settlements, and compliance documents (B/L, manifests, air waybills).',
    tags: [
      'D365 CE',
      'Dataverse',
      'NestJS',
      'TypeScript',
      'React PDF',
      'Xrm',
      'D365 FO',
      'Prisma',
    ],
    imageUrl: undefined,
    link: '#',
    status: 'Private Enterprise',
  },
  {
    title: 'MG Supply — Procurement Platform',
    industry: 'Procurement / Inventory',
    description:
      'End-to-end procurement & inventory platform on D365 CE/Dataverse with NestJS 11 orchestration API. Covers PR → RFQ → PO → receiving, multi-level approvals, and warehouse stock operations. Includes C# Dataverse plugins, TypeScript model-driven web resources, React satellite views, BullMQ background queues, and multi-layer Redis caching across multi-company/multi-BU scope.',
    tags: [
      'D365 CE',
      'Dataverse',
      'C# Plugins',
      'NestJS',
      'BullMQ',
      'Redis',
      'React',
      'Approval Workflows',
    ],
    imageUrl: undefined,
    link: '#',
    status: 'Private Enterprise',
  },
] as const;

export const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    description:
      'We start with a deep-dive into your business processes, pain points, and goals. I listen first, then translate your requirements into a clear technical roadmap.',
  },
  {
    step: '02',
    title: 'Architecture',
    description:
      'I design a scalable, maintainable solution architecture — choosing the right stack, defining data flows, and planning integrations with your existing ERP/CRM systems.',
  },
  {
    step: '03',
    title: 'Development',
    description:
      'Clean, documented code with iterative delivery. You get regular demos, transparent progress, and the ability to pivot early based on real feedback.',
  },
  {
    step: '04',
    title: 'Testing',
    description:
      'Rigorous validation — unit tests, integration tests, UAT, and real-world scenario simulation. Quality is non-negotiable before anything goes live.',
  },
  {
    step: '05',
    title: 'Deployment',
    description:
      'Smooth go-live with Docker-based deployments, CI/CD pipelines, and zero-downtime strategies. I handle the DevOps so your team focuses on business.',
  },
  {
    step: '06',
    title: 'Support',
    description:
      'Post-launch monitoring, performance tuning, and iterative enhancements. I treat every project as a long-term partnership, not a one-off delivery.',
  },
] as const;

export const experiencesData = [
  {
    title: 'Senior Power Platform & Dynamics 365 Developer',
    location: 'Profound Group | Alexandria, Egypt',
    description:
      'Leading enterprise D365 CE/FO implementations and full-stack integrations. Architecting NestJS middleware, Dataverse plugins, React/Next.js frontends, and Power Platform solutions. Owning end-to-end delivery from stakeholder workshops to production deployment. Delivered telemedicine, logistics, procurement, and finance automation platforms with measurable ROI.',
    icon: React.createElement(FaBriefcase),
    date: '07/2024 — Present',
  },
  {
    title: 'Full-Stack Developer & Freelance Consultant',
    location: 'Freelance | Alexandria, Egypt',
    description:
      'Delivered custom web applications and ERP integrations for clients using Next.js, React, TypeScript, and NestJS. Specialized in real-time systems (SignalR, WebSockets), multi-role dashboards, and API design. Built a D365FO middleware from scratch — sole ownership from discovery to deployment, saving clients 85–95% of manual data-entry time.',
    icon: React.createElement(FaReact),
    date: '11/2023 — 07/2024',
  },
  {
    title: 'Senior Banker / Operations Analyst',
    location: 'Banque Misr | Alexandria, Egypt',
    description:
      'Managed financial transactions, customer accounts, and compliance workflows for 5+ years. Developed deep analytical skills and a rigorous understanding of finance operations — expertise that now drives my ERP and process-automation work for finance teams.',
    icon: React.createElement(CgWorkAlt),
    date: '04/2018 — 09/2023',
  },
  {
    title: "Bachelor's Degree in Business Administration",
    location: 'Alexandria University | English Section',
    description:
      'Graduated with a strong foundation in finance, operations management, and business analysis. This business acumen enables me to bridge the gap between technical implementation and real-world business outcomes.',
    icon: React.createElement(LuGraduationCap),
    date: '2017',
  },
] as const;

export const skillsData = [
  {
    category: 'Microsoft Ecosystem',
    skills: [
      'Dynamics 365 CE',
      'Dynamics 365 FO',
      'Dataverse',
      'Power Platform',
      'Azure AD / Entra ID',
      'OData / Web API',
      'C# Dataverse Plugins',
      'Xrm / Model-Driven Apps',
    ],
    color: 'from-blue-500/20 to-blue-600/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    category: 'Backend & Integration',
    skills: [
      'NestJS',
      'Node.js',
      'TypeScript',
      'CQRS',
      'BullMQ',
      'Redis',
      'MongoDB',
      'PostgreSQL',
      'Prisma',
      'REST / GraphQL',
    ],
    color: 'from-emerald-500/20 to-emerald-600/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    category: 'Frontend Engineering',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Mantine',
      'SignalR',
      'TanStack Query',
      'i18n / RTL',
      'Zod / RHF',
      'Framer Motion',
    ],
    color: 'from-violet-500/20 to-violet-600/10',
    borderColor: 'border-violet-500/30',
    textColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    category: 'DevOps & Tooling',
    skills: [
      'Docker',
      'Swagger / OpenAPI',
      'Git / GitHub',
      'CI/CD',
      'Vercel',
      'Linux',
      'Postman',
      'Jest',
    ],
    color: 'from-amber-500/20 to-amber-600/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-600 dark:text-amber-400',
  },
] as const;

export const contactLinks = {
  email: 'moo3tazali@gmail.com',
  linkedin: 'https://www.linkedin.com/in/moo3tazali/',
  github: 'https://github.com/moo3tazali',
  upwork: '#',
} as const;
