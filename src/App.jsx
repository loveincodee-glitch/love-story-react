import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./styles/main.css";

import Welcome from "./screens/Welcome";
import Intro from "./screens/Intro";
import Gallery from "./screens/Gallery";
import Puzzle from "./screens/Puzzle";
import Proposal from "./screens/Proposal";
import Envelope from "./screens/Envelope";
import Celebration from "./screens/Celebration";
import HeartTransition from "./screens/HeartTransition";
import FinalLetter from "./screens/FinalLetter";
import Memory from "./screens/Memory";

import Hearts from "./components/Hearts";
import Footer from "./components/Footer";
import Petals from "./components/Petals";
import FadeOverlay from "./components/FadeOverlay";


import { THEME } from "./data/client";

export default function App() {

  const [screen, setScreen] = useState(0);
  const [fading, setFading] = useState(false);
  const [muted, setMuted] = useState(false);
  const globalMusicRef = useRef(null);

  function goNext() {
    setScreen(s => Math.min(s + 1, pages.length - 1));
  }

  useEffect(() => {
  const music = globalMusicRef.current;
  if (!music) return;

  music.volume = 0.45;

  const startMusic = () => {
    if (!muted) {
      music.play().catch(() => {});
    }
    window.removeEventListener("click", startMusic);
  };

  window.addEventListener("click", startMusic);

  return () => window.removeEventListener("click", startMusic);
}, [muted]);


  const pages = [
    <Welcome next={goNext} />,
    <Intro next={goNext} />,

    <Memory next={goNext} />,
    <Gallery next={goNext} />,
    <Puzzle next ={goNext}/>,

    <Envelope next={goNext} />,
    <Proposal next={goNext} />,

    <Celebration next={goNext} />,

    <HeartTransition next={goNext} />,
    <FinalLetter />
  ];

  document.body.className = THEME;

  return (
    <>
      {/* Global Music */}
      <audio ref={globalMusicRef} loop muted={muted}>
  <source src="/love.mp3" />
</audio>

      <button
  className={`mute-btn ${muted ? "muted" : ""}`}
  onClick={() => setMuted(m => !m)}
  aria-label="Toggle sound"
>
  <span className="mute-icon">
    {muted ? "🔇" : "🔊"}
  </span>
</button>



      {fading && <FadeOverlay />}

      <Hearts />
      <Petals />
      <Footer />

      <div className="center">

        <AnimatePresence mode="wait">

          <motion.div
            key={screen}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {pages[screen]}
          </motion.div>

        </AnimatePresence>

      </div>
    </>
  );
}
