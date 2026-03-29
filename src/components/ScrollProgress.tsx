import { useScrollProgress } from "../hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-dark-800">
      <div
        className="h-full bg-gradient-to-r from-accent-500 to-emerald-400 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
