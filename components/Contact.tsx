"use client";
import React from "react";
import SectionHeading from "./SectionHeading";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./SubmitBtn";
import toast from "react-hot-toast";

const Contact = () => {
  const { ref } = useSectionInView("Contact", 0.5);

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 0.8,
      }}
    >
      <SectionHeading>Contact Me</SectionHeading>
      <p className="text-gray-700 -mt-5 dark:text-white/80">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:moo3tazali@gmail.com">
          moo3tazali@gmail.com
        </a>{" "}
        or through this form.
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (FormData) => {
          const { data, error } = (await sendEmail(FormData)) as {
            data?: any;
            error?: any;
          };
          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Email sent successfully");
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
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <SubmitBtn />
      </form>
    </motion.section>
  );
};

export default Contact;
