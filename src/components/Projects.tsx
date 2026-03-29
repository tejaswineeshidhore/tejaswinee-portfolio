import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { resume } from "../data/resume";

const categoryColors: Record<string, string> = {
  "Mobile App": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Web App": "text-accent-400 bg-accent-400/10 border-accent-400/20",
  PWA: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Desktop App": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Dashboard: "text-accent-400 bg-accent-400/10 border-accent-400/20",
  "Internal Tool": "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

export function Projects() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft =
      scrollLeft.current - (x - startX.current) * 1.5;
  }

  function onMouseUp() {
    isDragging.current = false;
  }

  function scrollBy(direction: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  }

  return (
    <Section
      id="projects"
      label="04. projects"
      heading="Things I've Built"
      alternate
    >
      {/* Arrow controls */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-mono text-slate-600">
          {resume.projects.length} projects · drag or use arrows
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy("left")}
            aria-label="Scroll left"
            className="w-8 h-8 rounded-lg border border-dark-700 hover:border-accent-500/50 text-slate-500 hover:text-accent-400 transition-all duration-200 flex items-center justify-center"
          >
            ←
          </button>
          <button
            onClick={() => scrollBy("right")}
            aria-label="Scroll right"
            className="w-8 h-8 rounded-lg border border-dark-700 hover:border-accent-500/50 text-slate-500 hover:text-accent-400 transition-all duration-200 flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className="flex items-start gap-5 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: "none" }}
      >
        {resume.projects.map((project, i) => {
          const isExpanded = expanded === i;

          return (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => setExpanded(isExpanded ? null : i)}
              className="group relative flex flex-col shrink-0 rounded-xl border border-dark-700 bg-dark-800 p-6 cursor-pointer hover:border-accent-500/50 hover:shadow-lg hover:shadow-accent-500/5 transition-colors duration-300"
              style={{ width: "340px" }}
            >
              {/* Shimmer line on hover */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-xl" />

              {/* Index + impact */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
                  <span className="text-accent-400 font-mono text-xs font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
                  {project.impact}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-base mb-3 leading-snug group-hover:text-accent-400 transition-colors duration-200">
                {project.name}
              </h3>

              {/* Category badges — now an array */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.category.map((cat) => (
                  <span
                    key={cat}
                    className={`text-xs font-mono px-2 py-0.5 rounded border ${
                      categoryColors[cat] ??
                      "text-slate-400 bg-dark-700 border-dark-600"
                    }`}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-4">
                {project.description}
              </p>

              {/* Expandable highlights */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="highlights"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-dark-700 pt-4 mb-4">
                      <p className="text-xs font-mono text-slate-600 uppercase tracking-wider mb-3">
                        Key highlights
                      </p>
                      <ul className="space-y-2">
                        {project.highlights.map((point, j) => (
                          <li
                            key={j}
                            className="flex gap-2 text-xs text-slate-400 leading-relaxed"
                          >
                            <span className="text-accent-400 shrink-0 mt-0.5">
                              ▹
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tech stack + expand hint */}
              <div className="flex items-center justify-between pt-4 border-t border-dark-700/50">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-mono text-slate-600">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-mono text-slate-600 group-hover:text-accent-400 transition-colors shrink-0 ml-2">
                  {isExpanded ? "↑ less" : "↓ more"}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Trailing space */}
        <div className="shrink-0 w-4" />
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center gap-2 mt-5">
        {resume.projects.map((_, i) => (
          <button
            key={i}
            aria-label={`Jump to project ${i + 1}`}
            onClick={() =>
              scrollRef.current?.scrollTo({ left: i * 360, behavior: "smooth" })
            }
            className="w-1.5 h-1.5 rounded-full bg-dark-600 hover:bg-accent-400 transition-colors duration-200"
          />
        ))}
      </div>
    </Section>
  );
}
