import { useRef } from "react";

export function useAudio(src, initialVolume = 0.5) {

  const audioRef = useRef(null);

  function play() {
    if (!audioRef.current) return;
    audioRef.current.volume = initialVolume;
    audioRef.current.play().catch(() => {});
  }

  function fadeIn(duration = 1000) {
    if (!audioRef.current) return;

    audioRef.current.volume = 0;
    audioRef.current.play().catch(() => {});

    const step = initialVolume / (duration / 50);

    const fade = setInterval(() => {
      audioRef.current.volume = Math.min(
        initialVolume,
        audioRef.current.volume + step
      );

      if (audioRef.current.volume >= initialVolume) {
        clearInterval(fade);
      }
    }, 50);
  }

  function fadeOut(duration = 1000) {
    if (!audioRef.current) return;

    const step = audioRef.current.volume / (duration / 50);

    const fade = setInterval(() => {
      audioRef.current.volume = Math.max(
        0,
        audioRef.current.volume - step
      );

      if (audioRef.current.volume <= 0.01) {
        audioRef.current.pause();
        clearInterval(fade);
      }
    }, 50);
  }

  return {
    audioRef,
    play,
    fadeIn,
    fadeOut
  };
}
