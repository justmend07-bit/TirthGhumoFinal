'use client';
import { useEffect, useRef, useState } from 'react';

export default function VideoCard({
  src = '/Video/Somnath.mp4',
  poster = '/Screenshot 2025-12-19 143132.png',
}) {
  const vidRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  /* ---------------- Video event listeners ---------------- */

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setShowPlayButton(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowPlayButton(true);
    };

    v.addEventListener('play', handlePlay);
    v.addEventListener('pause', handlePause);

    return () => {
      v.removeEventListener('play', handlePlay);
      v.removeEventListener('pause', handlePause);
    };
  }, []);

  /* ---------------- Scroll-based autoplay ---------------- */

  useEffect(() => {
    const v = vidRef.current;
    const el = containerRef.current;
    if (!v || !el) return;

    v.muted = true;
    v.playsInline = true;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          try {
            await v.play();
          } catch {
            // Autoplay may still be blocked, that's fine
          }
        } else {
          v.pause();
        }
      },
      {
        threshold: 0.6, // 60% visible before playing
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  /* ---------------- Handlers ---------------- */

  const handlePlayClick = async () => {
    const v = vidRef.current;
    if (!v) return;

    try {
      v.muted = isMuted;
      await v.play();
    } catch (err) {
      console.error('Play failed:', err);
    }
  };

  const handleVideoClick = () => {
    const v = vidRef.current;
    if (!v) return;

    v.paused ? v.play() : v.pause();
  };

  const toggleMute = () => {
    const v = vidRef.current;
    if (!v) return;

    const next = !isMuted;
    v.muted = next;
    setIsMuted(next);
  };

  /* ---------------- UI ---------------- */

  return (
    <div
      ref={containerRef}
      className="relative w-[300px] md:w-[420px] h-[180px] md:h-[240px] rounded-2xl overflow-hidden border-4 border-white/90 shadow-2xl"
    >
      <video
        ref={vidRef}
        src={src}
        poster={poster}
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        onClick={handleVideoClick}
      />

      {/* Play Overlay */}
      {showPlayButton && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
          onClick={handlePlayClick}
        >
          <button
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/60 flex items-center justify-center hover:bg-white/30 transition-all"
            aria-label="Play video"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M8 5v14l11-7L8 5z" fill="white" />
            </svg>
          </button>
        </div>
      )}

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-3 right-3 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-black/60 transition-all"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? (
          // Muted icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M16.5 12L19 14.5M19 9.5L16.5 12M5 9H9L14 5V19L9 15H5V9Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // Volume icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 9H9L14 5V19L9 15H5V9Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 9C18.333 10.333 18.333 13.667 17 15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
