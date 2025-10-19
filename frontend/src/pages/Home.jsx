import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Countdown from "../components/Countdown.jsx";
import ConfettiEffect from "../components/ConfettiEffect.jsx";
import Gallery from "../components/Gallery.jsx";
import MusicPlayer from "../components/MusicPlayer.jsx";

export default function Home() {
  const [showCongrats, setShowCongrats] = useState(false);

  return (
    <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
      <section className="text-center mb-12 md:mb-16">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold neon-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Happy Birthday, Annu 🎉
        </motion.h1>
        <motion.p
          className="opacity-90 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          From Ada... ✨
        </motion.p>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Countdown onComplete={() => setShowCongrats(true)} />
        </motion.div>
      </section>

      <AnimatePresence>
        {showCongrats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-6 py-3 rounded-2xl glass shadow-neon text-neonBlue text-lg">
              Happy Birthday Annu 🎉
            </div>
            <ConfettiEffect fireOnce={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {showCongrats && (
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 neon-text">
            Memories Gallery
          </h2>
          <Gallery />
        </section>
      )}

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 neon-text">
          Leave a Wish
        </h2>
        <WishForm />
        <WishesList />
      </section>

      {showCongrats && (
        <>
          <section className="mb-12 md:mb-16 grid place-items-center">
            <div className="max-w-2xl text-center p-6 md:p-8 rounded-3xl glass shadow-neon">
              <h3 className="text-2xl md:text-3xl font-semibold neon-text mb-3">
                Dear Annu
              </h3>
              <p className="text-base md:text-lg opacity-90">
                "Happy Birthday! Wishing you an amazing day and many blessings
                for the year ahead."
              </p>
            </div>
          </section>
          <div className="text-center">
            <Link
              to="/message"
              className="inline-block px-5 py-3 rounded-full glass shadow-neon hover:scale-[1.02] transition"
            >
              Open Full Message
            </Link>
          </div>
        </>
      )}
      {showCongrats && <MusicPlayer autoStart={true} />}
    </div>
  );
}

function WishForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setName("");
      setMessage("");
      window.dispatchEvent(new CustomEvent("wishes:refresh"));
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid md:grid-cols-3 gap-3 mb-6">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Your name"
        className="px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-neonPink/50"
      />
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        placeholder="Your birthday wish"
        className="px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-neonBlue/50 md:col-span-1"
      />
      <button
        disabled={submitting}
        className="px-5 py-3 rounded-xl bg-neonPink/20 text-neonPink hover:bg-neonPink/30 transition"
      >
        {submitting ? "Sending..." : "Send Wish"}
      </button>
      {error && (
        <div className="md:col-span-3 text-red-400 text-sm">{error}</div>
      )}
    </form>
  );
}

function WishesList() {
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/messages");
        if (!res.ok) return;
        const data = await res.json();
        setWishes(data);
      } catch {}
    };

    load();
    const handler = () => load();
    window.addEventListener("wishes:refresh", handler);
    return () => window.removeEventListener("wishes:refresh", handler);
  }, []);

  return (
    <div className="grid gap-3">
      {wishes.length === 0 && (
        <div className="opacity-70">No wishes yet. Be the first to send</div>
      )}
      {wishes.map((w, i) => (
        <div key={i} className="p-4 rounded-xl glass">
          <div className="text-neonBlue font-semibold">{w.name}</div>
          <div className="opacity-90">{w.message}</div>
        </div>
      ))}
    </div>
  );
}
