import { useState,useRef,useEffect } from "react";

export default function Envelope({ next }) {
  const ambientRef = useRef(null);

  const [stage, setStage] = useState("idle");

  function handleOpen() {

    if (stage !== "idle") return;

    setStage("charging");

    // Build suspense
    setTimeout(() => setStage("opening"), 1200);

    // Reveal
    setTimeout(() => setStage("reveal"), 2200);

    // Go next
    setTimeout(() => next(), 3400);
  }
  useEffect(() => {

  const ambient = ambientRef.current;
  if (!ambient) return;

  ambient.volume = 0.12;

  // Play only after user interaction (browser safe)
  const play = () => {
    ambient.play().catch(() => {});
    window.removeEventListener("click", play);
  };

  window.addEventListener("click", play);

  return () => window.removeEventListener("click", play);

}, []);



  return (

    <div className={`envelope-screen stage-${stage}`}>
      <audio ref={ambientRef} loop>
  <source src="/paper-soft.mp3" />
</audio>


      <div className="magic-light" />


      <div className="card envelope-card">

        <h1>A Letter For You 💌</h1>


        <div
          className={`envelope magic ${stage}`}
          onClick={handleOpen}
        >

          <div className="env-back"></div>

          <div className="env-letter">
            ❤️
          </div>

          <div className="env-front"></div>

          <div className="env-glow"></div>

        </div>


        {stage === "idle" && <p>Tap to unlock 💕</p>}
        {stage === "charging" && <p>Unlocking… ✨</p>}
        {stage === "opening" && <p>Opening your heart… 💖</p>}
        {stage === "reveal" && <p>For you… 💌</p>}

      </div>

    </div>
  );
}
