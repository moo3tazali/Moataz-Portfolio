"use client";

import React from "react";
import SectionHeading from "./SectionHeading";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./SubmitBtn";
import toast from "react-hot-toast";
import { SiUpwork } from "react-icons/si";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { HiMail } from "react-icons/hi";

export default function Contact() {
  const { ref } = useSectionInView("Contact", 0.5);

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <SectionHeading>Get In Touch</SectionHeading>
      <p className="text-gray-700 -mt-4 mb-2 dark:text-white/80 sm:text-lg">
        Have a project in mind? Let&apos;s discuss how I can help.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Or email me directly at{" "}
        <a className="underline font-medium text-gray-700 dark:text-gray-300" href="mailto:moo3tazali@gmail.com">
          moo3tazali@gmail.com
        </a>
      </p>

      {/* Quick contact options */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <a
          href="#"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full border border-green-600/20 bg-green-50 px-5 py-2.5 text-sm font-medium text-green-700 transition hover:scale-105 hover:bg-green-100 dark:border-green-500/20 dark:bg-green-900/20 dark:text-green-400"
        >
          <SiUpwork /> Hire on Upwork
        </a>
        <a
          href="https://www.linkedin.com/in/moo3tazali/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-50 px-5 py-2.5 text-sm font-medium text-blue-700 transition hover:scale-105 hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-900/20 dark:text-blue-400"
        >
          <BsLinkedin /> LinkedIn
        </a>
        <a
          href="https://github.com/moo3tazali"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-gray-600/20 bg-gray-50 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:scale-105 hover:bg-gray-100 dark:border-gray-500/20 dark:bg-gray-800/50 dark:text-gray-300"
        >
          <BsGithub /> GitHub
        </a>
      </div>

      <form
        className="mt-4 flex flex-col dark:text-black text-left"
        action={async (FormData) => {
          const { data, error } = (await sendEmail(FormData)) as {
            data?: any;
            error?: any;
          };
          if (error) {
            toast.error(error);
            return;
          }
          toast.success("Message sent successfully! I'll get back to you soon.");
        }}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack outline-none dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all"
          name="senderEmail"
          type="email"
          placeholder="Your Email..."
          required
          maxLength={50}
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 resize-none outline-none dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all"
          name="message"
          placeholder="Tell me about your project, timeline, and goals..."
          required
          maxLength={5000}
        />
        <div className="flex justify-center">
          <SubmitBtn />
        </div>
      </form>
    </motion.section>
  );
}
