import { useState } from "react";
import { Section } from "./Section";
import { resume } from "../data/resume";

export function Experience() {
  const [active, setActive] = useState(0);
  const job = resume.experience[active];

  return (
    <Section
      id="experience"
      label="02. experience"
      heading="Where I've Worked"
      className="bg-dark-900/50"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Company tabs */}
        <div className="flex md:flex-col gap-2 md:w-48 shrink-0 overflow-x-auto md:overflow-visible">
          {resume.experience.map((exp, i) => (
            <button
              key={exp.company}
              onClick={() => setActive(i)}
              className={`px-4 py-3 text-left text-sm font-mono rounded-lg whitespace-nowrap transition-all duration-200 ${
                active === i
                  ? "bg-accent-500/10 text-accent-400 border border-accent-500/30"
                  : "text-slate-500 hover:text-slate-300 hover:bg-dark-700 border border-transparent"
              }`}
            >
              {exp.company}
            </button>
          ))}
        </div>

        {/* Job details */}
        <div className="flex-1 min-h-64">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white">
              {job.role}{" "}
              <span className="text-accent-400">@ {job.company}</span>
            </h3>
            <p className="font-mono text-sm text-slate-500 mt-1">
              {job.period} · {job.location}
            </p>
          </div>

          <ul className="space-y-4">
            {job.highlights.map((point, i) => (
              <li key={i} className="flex gap-3 text-slate-400 leading-relaxed">
                <span className="text-accent-400 mt-1 shrink-0">▹</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
