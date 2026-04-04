import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { resume } from "../data/resume";

const roles = [
  "Associate Technical Lead",
  "Frontend Engineer",
  "Team Lead & Mentor",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing",
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    const current = roles[roleIndex];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          75 + Math.random() * 40, // slight random delay = more natural
        );
      } else {
        timeoutRef.current = setTimeout(() => setPhase("pausing"), 2200);
      }
    } else if (phase === "pausing") {
      timeoutRef.current = setTimeout(() => setPhase("deleting"), 500);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(
          () => setDisplayed((d) => d.slice(0, -1)),
          35,
        );
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, phase, roleIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div
        className="hero-grid absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(to right, var(--grid-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="font-mono text-accent-400 text-sm mb-4 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="w-8 h-px bg-accent-400" />
            Hello, world! I'm
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {resume.name.split(" ")[0]}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-emerald-400">
              {resume.name.split(" ")[1]}
            </span>
          </motion.h1>

          {/* Typing area — fixed height prevents layout shift */}
          <motion.div
            className="h-10 flex items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-xl md:text-2xl font-mono text-slate-300">
              {displayed}
              <span
                className="inline-block w-0.5 h-5 bg-accent-400 ml-0.5 align-middle"
                style={{ animation: "blink 1s step-end infinite" }}
              />
            </span>
          </motion.div>

          <motion.p
            className="text-slate-400 max-w-xl text-lg leading-relaxed mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {resume.summary.split(".")[0]}.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="#experience"
              className="px-6 py-3 bg-accent-500 hover:bg-accent-400 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-accent-500/25 hover:-translate-y-0.5"
            >
              View my work
            </a>
            <a
              href={resume.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-dark-600 hover:border-accent-500 text-slate-300 hover:text-white font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              LinkedIn ↗
            </a>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {[
            { value: "6+", label: "Years Experience" },
            { value: "3", label: "Companies" },
            { value: "10K+", label: "Users Impacted" },
            { value: "80%+", label: "Test Coverage" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="border border-dark-700 rounded-xl p-5 bg-dark-800/50 hover:border-accent-500/40 transition-all duration-300 hover:-translate-y-1 cursor-default"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              <div className="text-3xl font-bold text-white mb-1 font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-slate-600 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.div>
    </section>
  );
}
