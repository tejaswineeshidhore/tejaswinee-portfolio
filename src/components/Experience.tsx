import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        <div className="flex md:flex-col gap-2 md:w-52 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {resume.experience.map((exp, i) => (
            <button
              key={exp.company}
              onClick={() => setActive(i)}
              className={`relative px-4 py-3 text-left text-sm font-mono rounded-lg whitespace-nowrap transition-all duration-200 ${
                active === i
                  ? "bg-accent-500/10 text-accent-400"
                  : "text-slate-500 hover:text-slate-300 hover:bg-dark-700"
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent-400 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="pl-2">{exp.company}</span>
              <span className="block text-xs text-slate-600 font-sans pl-2 mt-0.5">
                {exp.period.split("–")[0].trim()}
              </span>
            </button>
          ))}
        </div>

        {/* Job details with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white">
                {job.role}
                <span className="text-accent-400"> @ {job.company}</span>
              </h3>
              <p className="font-mono text-sm text-slate-500 mt-1">
                {job.period} · {job.location}
              </p>
            </div>

            <ul className="space-y-4">
              {job.highlights.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex gap-3 text-slate-400 leading-relaxed"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="text-accent-400 mt-1.5 shrink-0 text-xs">
                    ▹
                  </span>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
