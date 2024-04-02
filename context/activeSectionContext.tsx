"use client";
import React, { createContext, useContext, useState } from "react";
import type { SectionName } from "@/lib/types";

type childrenProps = { children: React.ReactNode };
type activeSectionContextType = {
  activeSection: SectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
};

const activeSectionContext = createContext<activeSectionContextType | null>(
  null
);
export default function ActiveSectionContextProvider({
  children,
}: childrenProps) {
  const [activeSection, setActiveSection] = useState<SectionName>("Home");

  return (
    <activeSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </activeSectionContext.Provider>
  );
}

export const useActiveSection = () => {
  const context = useContext(activeSectionContext);
  if (context === null) {
    throw new Error(
      "useActiveSection must be used within an ActiveSectionContextProvider"
    );
  }

  return context;
};
