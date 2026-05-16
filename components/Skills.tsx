"use client";

import { skillsData } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const skillItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[60rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>Technical Expertise</SectionHeading>
      <p className="mb-10 -mt-4 text-gray-600 dark:text-gray-400 sm:text-lg">
        A deep toolkit built across the Microsoft ecosystem, backend
        architecture, frontend engineering, and DevOps.
      </p>

      <motion.div
        className="grid gap-6 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {skillsData.map((category) => (
          <motion.div
            key={category.category}
            variants={categoryVariants}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className={`relative overflow-hidden rounded-2xl border ${category.borderColor} bg-gradient-to-br ${category.color} p-6 text-left backdrop-blur-sm dark:bg-opacity-10`}
          >
            <h3
              className={`mb-4 text-base font-bold ${category.textColor}`}
            >
              {category.category}
            </h3>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {category.skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={skillItemVariants}
                  className="rounded-lg bg-white/80 px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm backdrop-blur-sm dark:bg-gray-900/60 dark:text-gray-200"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
