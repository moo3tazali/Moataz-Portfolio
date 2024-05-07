import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import HooBank from "@/public/HooBank.png";
import Todo from "@/public/Todo.png";
import Dashboard from "@/public/Dashboard.png";
import AnimationPower from "@/public/AnimationPower.png";
import linkedInCloneV1 from "@/public/linkedin-clone v1.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Front-End Developer",
    location: "Alex-EG",
    description:
      "I'm now a junior frontend developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: "2023 - present",
  },
  {
    title: "Banker",
    location: "Alex-EG",
    description:
      "I worked as a bank employee for 5 years before i decided to leave and shift my whole career into something i love.",
    icon: React.createElement(CgWorkAlt),
    date: "2018 - 2023",
  },
  {
    title: "Bachelor’s degree",
    location: "Alexandria University",
    description:
      "I have a bachelor degree in business administration from faculty of commerce English section.",
    icon: React.createElement(LuGraduationCap),
    date: "2017",
  },
] as const;

export const projectsData = [
  {
    title: "LinkedIn-Clone V1",
    description:
      "This project is a clone of LinkedIn built using React with Vite as the bundler. It aims to replicate some of the core features of LinkedIn, allowing users to view posts from others, interact with likes and comments, and manage their own profiles.",
    tags: [
      "React",
      "Tailwind",
      "MUI",
      "Redux",
      "React form",
      "React Query",
      "Zod",
    ],
    imageUrl: linkedInCloneV1,
    link: "https://moo3tazali.github.io/linkedin-clone/",
  },

  {
    title: "Todo App",
    description:
      "React Todo App is built with React.js. It typically features the ability to add, edit, and delete tasks, as well as mark them as complete. Users can interact with a clean, responsive and intuitive interface.",
    tags: ["React", "Tailwind"],
    imageUrl: Todo,
    link: "https://moo3tazali.github.io/React-Todo-App/",
  },
  {
    title: "HooBank",
    description:
      "HooBank website, which is a modern UI/UX website built using React.js and Tailwind CSS. This project is a great example of a modern web application with a clean and responsive design.",
    tags: ["React", "Tailwind"],
    imageUrl: HooBank,
    link: "https://moo3tazali.github.io/HooBank/",
  },
  {
    title: "Animation Power",
    description:
      "The “Animation-Power” website is a project that showcases the use of HTML and CSS to create animated web elements.",
    tags: ["HTML", "CSS"],
    imageUrl: AnimationPower,
    link: "https://moo3tazali.github.io/Animation-Power/",
  },
  {
    title: "Dashboard",
    description:
      "Dashboard interface designed to provide users with an overview of key metrics and data points. Typically used to visualize data trends, monitor performance, and make informed decisions based on real-time information.",
    tags: ["HTML", "CSS", "Custom CSS Framework"],
    imageUrl: Dashboard,
    link: "https://moo3tazali.github.io/M-Dashboard/",
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Git",
  "Tailwind",
  "bootstrap",
  "MUI",
  "Prisma",
  "Redux",
  "Strapi",
  "Framer Motion",
  "Postman",
] as const;
