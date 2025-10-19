import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Message() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4 pt-24">
      <motion.div
        className="max-w-2xl text-center p-8 rounded-3xl glass shadow-neon"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold neon-text mb-4">
          Dear Annu,
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          ""Happy Birthday, Annu! 🥳🎉 Wishing you a day full of laughter,
          endless fun, and unforgettable memories. May this year bring you
          closer to your dreams, fill your life with happiness, and surround you
          with amazing people. 🎂✨""
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-full glass hover:scale-[1.02] transition"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
