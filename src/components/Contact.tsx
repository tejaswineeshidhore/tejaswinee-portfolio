import { useState } from "react";
import { Section } from "./Section";
import { resume } from "../data/resume";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(resume.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="contact" label="06. contact" heading="Get In Touch" alternate>
      <div className="max-w-2xl">
        <p className="text-slate-400 text-lg leading-relaxed mb-10">
          I'm always open to discussing new opportunities, interesting projects,
          or just having a conversation about tech. My inbox is open.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {/* Email with copy button */}
          <div className="card group">
            <p className="text-xs font-mono text-slate-600 mb-2 uppercase tracking-wider">
              Email
            </p>
            <div className="flex items-center justify-between gap-2">
              <a
                href={`mailto:${resume.email}`}
                className="text-slate-300 hover:text-accent-400 transition-colors text-sm break-all"
              >
                {resume.email}
              </a>
              <button
                onClick={copyEmail}
                className="shrink-0 text-xs font-mono px-2 py-1 rounded border border-dark-600 hover:border-accent-500 text-slate-500 hover:text-accent-400 transition-all duration-200"
                title="Copy email"
              >
                {copied ? "✓ copied" : "copy"}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div className="card">
            <p className="text-xs font-mono text-slate-600 mb-2 uppercase tracking-wider">
              Phone
            </p>
            <a
              href={`tel:${resume.phone}`}
              className="text-slate-300 hover:text-accent-400 transition-colors text-sm"
            >
              {resume.phone}
            </a>
          </div>

          {/* LinkedIn */}
          <div className="card">
            <p className="text-xs font-mono text-slate-600 mb-2 uppercase tracking-wider">
              LinkedIn
            </p>
            <a
              href={resume.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-accent-400 transition-colors text-sm"
            >
              tejaswinee-shidhore ↗
            </a>
          </div>

          {/* Location */}
          <div className="card">
            <p className="text-xs font-mono text-slate-600 mb-2 uppercase tracking-wider">
              Location
            </p>
            <p className="text-slate-300 text-sm">{resume.location}</p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4">
          <a
            href={`mailto:${resume.email}`}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-500 hover:bg-accent-400 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-accent-500/25 hover:-translate-y-0.5"
          >
            Say Hello →
          </a>

          {/* PDF download — points to your resume file in /public */}
          <a
            href={`${import.meta.env.BASE_URL}Tejaswinee_Resume_2026.pdf`}
            download="Tejaswinee_Shidhore_Resume.pdf"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-dark-600 hover:border-accent-500 text-slate-300 hover:text-white font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            Download CV ↓
          </a>
        </div>
      </div>
    </Section>
  );
}
