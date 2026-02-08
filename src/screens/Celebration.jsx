import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

export default function Celebration({ next }) {

  const [phase, setPhase] = useState(1);
  const canvasRef = useRef(null);

  /* Timeline */
  useEffect(() => {

    const timers = [];

    // Fade in
    timers.push(setTimeout(() => setPhase(2), 1200));

    // Fireworks
    timers.push(setTimeout(() => setPhase(3), 2500));

    // Exit
    timers.push(setTimeout(() => next(), 8500));

    return () => timers.forEach(clearTimeout);

  }, [next]);


  /* Confetti */
  useEffect(() => {

    if (phase !== 3) return;

    const fire = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    const colors = [
      "#ff4d6d",
      "#ffd1dc",
      "#ffffff",
      "#ff9acb"
    ];

    let shots = 0;

    const blast = setInterval(() => {

      fire({
        particleCount: 130,
        spread: 95,
        startVelocity: 42,
        gravity: 0.65,
        ticks: 260,
        shapes: ["heart"],

        origin: {
          x: Math.random() * 0.6 + 0.2,
          y: Math.random() * 0.4 + 0.1,
        },

        colors,
      });

      shots++;

      if (shots > 9) clearInterval(blast);

    }, 450);

    return () => clearInterval(blast);

  }, [phase]);


  return (

    <div className={`cinema-screen phase-${phase}`}>

      <canvas
        ref={canvasRef}
        className="confetti-canvas"
      />

      <div className="cinema-content">

        <h1>Forever Starts Now 💖</h1>

        <p>Two hearts. One story.</p>

        <div className="cinema-glow" />

      </div>

    </div>
  );
}
