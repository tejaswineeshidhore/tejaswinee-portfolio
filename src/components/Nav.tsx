import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useTheme } from '../hooks/useTheme';

const links = ['about', 'experience', 'skills', 'projects', 'education', 'contact'];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(links);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0.5 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/90 backdrop-blur-md border-b border-dark-700'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-mono text-accent-400 text-sm font-medium hover:text-accent-300 transition-colors"
        >
          ts<span className="text-white">.</span>dev
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <li key={link}>
              <a
                href={`#${link}`}
                className={`relative text-sm font-medium transition-colors duration-200 py-1 ${
                  activeId === link
                    ? 'text-accent-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link}
                {/* Active indicator dot */}
                {activeId === link && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg border border-dark-600 hover:border-accent-500 flex items-center justify-center text-slate-400 hover:text-accent-400 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? '☀' : '☾'}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-white w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-900 border-b border-dark-700 overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-3">
              {links.map(link => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-sm font-medium capitalize py-1 transition-colors duration-200 ${
                      activeId === link ? 'text-accent-400' : 'text-slate-400'
                    }`}
                  >
                    {activeId === link && (
                      <span className="text-accent-400 mr-2">▹</span>
                    )}
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}