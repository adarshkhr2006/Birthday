import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import ConfettiEffect from "./ConfettiEffect.jsx";

function getNextBirthday() {
  const now = new Date();
  const currentYear = now.getFullYear();
  // Birthday: 20 October
  const target = new Date(currentYear, 9, 20, 0, 0, 0, 0);
  if (target.getTime() - now.getTime() < 0) {
    return new Date(currentYear + 1, 9, 20, 0, 0, 0, 0);
  }
  return target;
}

export default function Countdown({ onComplete, testSeconds = null }) {
  const targetDate = useMemo(() => {
    if (typeof testSeconds === "number" && testSeconds > 0) {
      return new Date(Date.now() + testSeconds * 1000);
    }
    return getNextBirthday();
  }, [testSeconds]);
  const [timeLeft, setTimeLeft] = useState(targetDate.getTime() - Date.now());
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = targetDate.getTime() - Date.now();
      setTimeLeft(diff);
      if (diff <= 0) {
        clearInterval(interval);
        setFinished(true);
        onComplete?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  const totalSeconds = Math.max(0, Math.floor(timeLeft / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const item = (label, value) => (
    <motion.div
      className="flex flex-col items-center p-3 md:p-4 rounded-xl glass min-w-[70px]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <motion.div
        key={label + value}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250 }}
        className="text-2xl md:text-4xl font-bold text-neonPink"
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <div className="text-xs md:text-sm opacity-80">{label}</div>
    </motion.div>
  );

  return (
    <div className="relative">
      <div className="flex gap-3 md:gap-5 justify-center">
        {item("Days", days)}
        {item("Hours", hours)}
        {item("Minutes", minutes)}
        {item("Seconds", seconds)}
      </div>
      {finished && <ConfettiEffect fireOnce={true} />}
    </div>
  );
}
