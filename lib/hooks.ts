import { useActiveSection } from "@/context/activeSectionContext";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "./types";

export const useSectionInView = (
  sectionName: SectionName,
  threshold = 0.75
) => {
  const { setActiveSection } = useActiveSection();
  const { ref, inView } = useInView({
    threshold,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, sectionName]);

  return {
    ref,
    inView,
  };
};
