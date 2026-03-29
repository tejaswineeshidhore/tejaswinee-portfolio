import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  label: string;
  heading: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({
  id,
  label,
  heading,
  children,
  className = "",
}: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className={`py-24 ${className}`} ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-subheading">
            <span className="w-6 h-px bg-accent-400" />
            <span className="font-mono">{label}</span>
          </p>
          <h2 className="section-heading">{heading}</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
