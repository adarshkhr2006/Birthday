import { useEffect, useMemo, useRef, useState } from "react";

export default function MusicPlayer({ autoStart = false }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Simple playlist: local file first, then a couple of fallback URLs
  const playlist = useMemo(
    () => ["/Music/AnnuTheme.mp3", "/Music/music1.mp3", "/Music/music2.mp3"],
    []
  );

  useEffect(() => {
    const onUserGesture = () => {
      setUserInteracted(true);
    };
    window.addEventListener("click", onUserGesture, { once: true });
    window.addEventListener("touchstart", onUserGesture, { once: true });
    return () => {
      window.removeEventListener("click", onUserGesture);
      window.removeEventListener("touchstart", onUserGesture);
    };
  }, []);

  // Try to start immediately when mounted if requested (after countdown mounts component)
  useEffect(() => {
    if (!autoStart || !audioRef.current) return;
    const el = audioRef.current;
    el.autoplay = true;
    // Attempt to play with sound right away
    el.muted = false;
    setIsMuted(false);
    el.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {});
  }, [autoStart]);

  // Load current track and auto-play after first interaction
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = playlist[currentIndex % playlist.length];
    if (userInteracted && !isMuted) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    if (userInteracted && audioRef.current && !isPlaying && !isMuted) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [userInteracted, isMuted, isPlaying]);

  // No play/pause UI; we auto-play when possible

  const stopPlayback = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    try {
      audioRef.current.currentTime = 0;
    } catch {}
    setIsPlaying(false);
  };

  const nextTrack = () => {
    setCurrentIndex((idx) => (idx + 1) % playlist.length);
  };

  // Auto-advance every 30s while playing
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      nextTrack();
    }, 30000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // Advance on track end too (natural end)
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const handleEnded = () => nextTrack();
    el.addEventListener("ended", handleEnded);
    return () => el.removeEventListener("ended", handleEnded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <audio ref={audioRef} preload="auto" />
      <div className="fixed bottom-6 right-6 z-40 flex gap-2">
        <button
          onClick={stopPlayback}
          className="h-12 w-12 rounded-full glass shadow-neon grid place-items-center transition-transform hover:scale-105"
          aria-label="Stop"
          title="Stop"
        >
          ⏹️
        </button>
        <button
          onClick={nextTrack}
          className="h-12 w-12 rounded-full glass shadow-neon grid place-items-center transition-transform hover:scale-105"
          aria-label="Next track"
          title="Next"
        >
          ⏭️
        </button>
      </div>
    </>
  );
}
