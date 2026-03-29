import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { resume } from '../data/resume';

const roles = [
  'Associate Technical Lead',
  'Frontend Engineer',
  'React Developer',
  'Team Lead',
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex(i => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #38bdf8 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-accent-400 text-sm mb-4 flex items-center gap-2">
            <span className="w-8 h-px bg-accent-400" />
            Hello, world! I'm
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            {resume.name.split(' ')[0]}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-emerald-400">
              {resume.name.split(' ')[1]}
            </span>
          </h1>

          <div className="h-12 flex items-center mb-6">
            <span className="text-2xl md:text-3xl font-light text-slate-300">
              {displayed}
              <span className="animate-blink text-accent-400">|</span>
            </span>
          </div>

          <p className="text-slate-400 max-w-xl text-lg leading-relaxed mb-10">
            {resume.summary.split('.')[0]}.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#experience"
              className="px-6 py-3 bg-accent-500 hover:bg-accent-400 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-accent-500/25 hover:-translate-y-0.5"
            >
              View my work
            </a>
            <a
              href={`mailto:${resume.email}`}
              className="px-6 py-3 border border-dark-600 hover:border-accent-500 text-slate-300 hover:text-white font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            { value: '6+', label: 'Years Experience' },
            { value: '10K+', label: 'Users Impacted' },
            { value: '80%+', label: 'Test Coverage' },
            { value: '95%', label: 'On-time Delivery' },
          ].map(stat => (
            <div
              key={stat.label}
              className="border border-dark-700 rounded-xl p-5 bg-dark-800/50 hover:border-accent-500/40 transition-colors duration-300"
            >
              <div className="text-3xl font-bold text-white mb-1 font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span className="text-xs font-mono">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-600 to-transparent animate-pulse" />
      </div>
    </section>
  );
}