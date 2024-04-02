"use server";

import { getErrorMessage } from "@/lib/utils";
import { Resend } from "resend";
import ContactFormEmail from "@/emails/ContactFormEmail";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

const validateString = (value: unknown): boolean => {
  if (!value || typeof value !== "string") {
    return false;
  }

  return true;
};

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateString(senderEmail)) {
    return Error("Invalid sender email");
  }

  if (!validateString(message)) {
    return Error("Invalid message");
  }

  let data: unknown;
  try {
    data = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: "moo3tazali@gmail.com",
      subject: "It's an important message from your portfolio",
      reply_to: senderEmail as string,
      react: React.createElement(ContactFormEmail, {
        message: message as string,
        senderEmail: senderEmail as string,
      }),
    });
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }

  return { data };
};
