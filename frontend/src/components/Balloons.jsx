import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function Balloons() {
  const balloons = useMemo(() => Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 12 + Math.random() * 10,
    color: [
      'bg-pink-400',
      'bg-purple-400',
      'bg-blue-400',
      'bg-teal-300',
      'bg-yellow-300'
    ][Math.floor(Math.random() * 5)]
  })), []);

  useEffect(() => {}, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {balloons.map(b => (
        <motion.div
          key={b.id}
          initial={{ y: '110%' }}
          animate={{ y: '-10%' }}
          transition={{ repeat: Infinity, delay: b.delay, duration: b.duration, ease: 'linear' }}
          className="absolute"
          style={{ left: `${b.left}%` }}
        >
          <div className={`w-5 h-6 md:w-7 md:h-9 rounded-b-full ${b.color} shadow-neon`}></div>
          <div className="w-[1px] h-12 md:h-16 bg-white/30 mx-auto"></div>
        </motion.div>
      ))}
    </div>
  );
}

