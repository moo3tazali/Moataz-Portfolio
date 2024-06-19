"use client";
import { useState } from "react";

import { Projects } from "@/components/Projects";

export const ProjectsSwitcher = () => {
  const [framework, setFramework] = useState<"react" | "angular">("react");

  return (
    <>
      <div className="flex items-center justify-center gap-x-3">
        <button onClick={() => setFramework("react")}>React</button>
        <button onClick={() => setFramework("angular")}>Angular</button>
      </div>

      {framework === "react" && <Projects />}
    </>
  );
};