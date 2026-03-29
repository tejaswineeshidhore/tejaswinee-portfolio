import { resume } from "../data/resume";

export function Footer() {
  return (
    <footer className="border-t border-dark-700 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-slate-600 text-sm">
          Built by <span className="text-accent-400">{resume.name}</span> ·{" "}
          {new Date().getFullYear()}
        </p>
        <p className="font-mono text-slate-700 text-xs">
          React · TypeScript · Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
