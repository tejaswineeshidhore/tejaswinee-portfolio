import { Section } from "./Section";
import { resume } from "../data/resume";

export function Education() {
  const edu = resume.education;
  return (
    <Section id="education" label="05. education" heading="Where I Studied">
      <div className="card max-w-2xl flex flex-col sm:flex-row gap-6 items-start">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-500/20 to-emerald-500/20 border border-accent-500/20 flex items-center justify-center shrink-0">
          <span className="text-2xl">🎓</span>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">{edu.degree}</h3>
          <p className="text-accent-400 font-mono text-sm mt-1">
            {edu.institution}
          </p>
          <p className="text-slate-500 text-sm mt-1">{edu.location}</p>
          <div className="flex gap-4 mt-4">
            <span className="tag">{edu.period}</span>
            <span className="tag text-emerald-400">{edu.grade}</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
