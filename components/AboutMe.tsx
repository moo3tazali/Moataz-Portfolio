"use client";
import React from "react";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

const AboutMe = () => {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center !leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.175,
      }}
      id="about"
    >
      <SectionHeading>About Me</SectionHeading>
      <p className="mb-3 text-[15px]">
        Having graduated with a degree in{" "}
        <span className="font-semibold">Business Administration</span> and
        subsequently gained five years of valuable experience in the banking
        sector, I decided to pursue my passion for programming. This led me to
        enroll in a coding bootcamp where I immersed myself in
        <span className="font-semibold"> front-end web development</span>.{" "}
        <span className="italic">
          <br />
          What truly excites me about programming
        </span>{" "}
        is the inherent problem-solving aspect. I{" "}
        <span className="underline">love</span> the feeling of finally figuring
        out a solution to a problem. My core stack is{" "}
        <span className="font-semibold">React and Next.js</span>. I've
        cultivated proficiency in a range of technologies, including TypeScript
        and Prisma, and I'm constantly seeking opportunities to expand my
        toolkit. Now, I am eager to leverage my skills as a software developer.
        I am actively seeking a{" "}
        <span className="font-semibold">full-time position</span> where I can
        contribute to innovative projects and collaborate with like-minded
        professionals in a dynamic environment.
        <span className="italic"> Beyond coding</span>, I am fueled by a passion
        for continuous learning. Whether delving into historical narratives or
        exploring different cultures and countries. I am currently learning
        about
        <span className="font-semibold"> Node.js and back-end developing</span>.
        I approach every challenge with enthusiasm and a commitment to
        excellence, and I am eager to bring this mindset to a forward-thinking
        team.
      </p>
    </motion.section>
  );
};

export default AboutMe;
