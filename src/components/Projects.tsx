import { Section } from "./Section";
import { resume } from "../data/resume";

export function Projects() {
  return (
    <Section
      id="projects"
      label="04. projects"
      heading="Things I've Built"
      className="bg-dark-900/50"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resume.projects.map((project, i) => (
          <div
            key={i}
            className="card group flex flex-col h-full relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
                <span className="text-accent-400 font-mono text-sm font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
                {project.impact}
              </span>
            </div>

            <h3 className="text-white font-semibold text-lg mb-3 leading-snug group-hover:text-accent-400 transition-colors duration-200">
              {project.name}
            </h3>

            <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((t) => (
                <span key={t} className="text-xs font-mono text-slate-500">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
