import { Section } from './Section';
import { resume } from '../data/resume';

export function About() {
  return (
    <Section id="about" label="01. about" heading="Who I Am">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-slate-400 leading-relaxed text-lg mb-6">
            {resume.summary}
          </p>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Location', value: resume.location },
              { label: 'Current Role', value: `${resume.title} @ ${resume.company}` },
              { label: 'Email', value: resume.email },
            ].map(item => (
              <div key={item.label} className="flex gap-3 text-sm">
                <span className="text-accent-400 font-mono w-28 shrink-0">{item.label}</span>
                <span className="text-slate-300">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual card */}
        <div className="card relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-400 to-emerald-400 flex items-center justify-center text-2xl font-bold text-dark-950 mb-6">
              TS
            </div>
            <h3 className="text-white font-semibold text-lg mb-1">{resume.name}</h3>
            <p className="text-accent-400 font-mono text-sm mb-4">{resume.title}</p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Based in {resume.location}. Passionate about building products that scale,
              leading teams that deliver, and writing code that lasts.
            </p>
            <div className="mt-6 pt-6 border-t border-dark-700 flex gap-4">
              <a
                href={resume.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-slate-400 hover:text-accent-400 transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href={`mailto:${resume.email}`}
                className="text-xs font-mono text-slate-400 hover:text-accent-400 transition-colors"
              >
                Email ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}