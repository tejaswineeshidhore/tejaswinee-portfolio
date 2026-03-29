import { Section } from "./Section";
import { resume } from "../data/resume";

export function Skills() {
  return (
    <Section id="skills" label="03. skills" heading="What I Work With">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(resume.skills).map(([category, items]) => (
          <div key={category} className="card group">
            <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-400" />
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
