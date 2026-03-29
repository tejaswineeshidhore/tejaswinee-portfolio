import { Section } from './Section';
import { resume } from '../data/resume';

export function Contact() {
  return (
    <Section id="contact" label="06. contact" heading="Get In Touch"
      className="bg-dark-900/50">
      <div className="max-w-2xl">
        <p className="text-slate-400 text-lg leading-relaxed mb-10">
          I'm always open to discussing new opportunities, interesting projects,
          or just having a conversation about tech. My inbox is open.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {[
            { label: 'Email', value: resume.email, href: `mailto:${resume.email}` },
            { label: 'Phone', value: resume.phone, href: `tel:${resume.phone}` },
            { label: 'LinkedIn', value: 'tejaswinee-shidhore', href: resume.linkedin },
            { label: 'Location', value: resume.location, href: null },
          ].map(item => (
            <div key={item.label} className="card group">
              <p className="text-xs font-mono text-slate-600 mb-1 uppercase tracking-wider">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="text-slate-300 hover:text-accent-400 transition-colors text-sm break-all"
                >
                  {item.value} ↗
                </a>
              ) : (
                <p className="text-slate-300 text-sm">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        <a
          href={`mailto:${resume.email}`}
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent-500 hover:bg-accent-400 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-accent-500/25 hover:-translate-y-1"
        >
          Say Hello
          <span>→</span>
        </a>
      </div>
    </Section>
  );
}