import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const placeholders = [
  "/images/Annu1.jpg",
  "/images/Annu2.jpg",
  "/images/Annu3.jpg",
];

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {placeholders.map((src, idx) => (
        <motion.button
          key={src}
          onClick={() => setActive(src)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="overflow-hidden rounded-xl ring-1 ring-white/10"
        >
          <img
            src={src}
            alt={`Memory ${idx + 1}`}
            className="aspect-square object-cover hover:brightness-110 transition-all"
          />
        </motion.button>
      ))}

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.img
              src={active}
              alt="Large"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-h-[85vh] w-auto rounded-2xl shadow-neon"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
