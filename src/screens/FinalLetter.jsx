import { useState, useRef,useEffect } from "react";

export default function FinalLetter() {

  /* URL Params */
  const params = new URLSearchParams(window.location.search);
  const ambientRef = useRef(null);

  const her = params.get("her") || "My Love";
  const him = params.get("him") || "Someone";
  const date = params.get("date") || "this day";


  /* Emotional Letter */
  const text = `

My Love ❤️

Dear ${her},

I don’t know when exactly it happened…

But somewhere between our first hello  
and ${date},

you quietly became my whole world.

In your smile,
I found my peace.

In your voice,
I found my home.

On your worst days,
I promise to hold you.

On your best days,
I promise to cheer the loudest.

Even when life gets heavy,
even when we argue,
even when everything feels messy…

I will still choose you.

Again.
And again.
And forever.

If love had a shape,
it would look like you.

If forever had a name,
it would be yours.

Thank you…
for loving me,
for believing in me,
for staying.

I am proud to be yours.

I am grateful for you.

And I promise…

As long as I breathe,
you will never walk alone.

Yours,
Always & Only,

${him} 💍❤️
`;


  /* State */
  const [burned, setBurned] = useState(false);
  const [shownText, setShownText] = useState("");
  const [progress, setProgress] = useState(0);

  const lastFire = useRef(0);


  /* Burn Handler */
  function burn(e) {

    if (burned) return;

    const now = Date.now();

    // Throttle
    if (now - lastFire.current < 50) return;

    lastFire.current = now;

    const x = e.clientX;
    const y = e.clientY;

    createFire(x, y);
    createSmoke(x, y);

    setProgress(p => {

      const next = Math.min(p + 1, 100);

      if (next >= 100) startReveal();

      return next;
    });
  }


  function createFire(x, y) {

    const fire = document.createElement("div");

    fire.className = "fire-dot";

    fire.style.left = x + "px";
    fire.style.top = y + "px";

    document.body.appendChild(fire);

    setTimeout(() => fire.remove(), 1200);
  }


  function createSmoke(x, y) {

    const smoke = document.createElement("div");

    smoke.className = "smoke";

    smoke.style.left = x + "px";
    smoke.style.top = y + "px";

    document.body.appendChild(smoke);

    setTimeout(() => smoke.remove(), 2500);
  }


  /* Reveal */
  function startReveal() {

    if (burned) return;

    setBurned(true);

    document.body.classList.add("final-glow");

    let i = 0;

    const timer = setInterval(() => {

      setShownText(text.slice(0, i));

      i++;

      if (i > text.length) clearInterval(timer);

    }, 45);
  }
useEffect(() => {

  const ambient = ambientRef.current;
  if (!ambient) return;

  ambient.volume = 0.1;

  const play = () => {
    ambient.play().catch(() => {});
    window.removeEventListener("click", play);
  };

  window.addEventListener("click", play);

  return () => {
    window.removeEventListener("click", play);
    ambient.pause();
  };

}, []);


  return (
    <div
      className="letter-screen"
      onMouseMove={burn}
      onTouchMove={e => {
        if (e.touches[0]) burn(e.touches[0]);
      }}
    >

      {/* Burn Loader */}
      {!burned && (

        <div className="burn-hint">

          <p>🔥 Burning Love...</p>

          <div className="burn-progress">

            <div
              className="burn-bar"
              style={{ width: `${progress}%` }}
            />

          </div>

          <span>{progress}%</span>

        </div>
      )}

      <audio ref={ambientRef} loop>
  <source src="/paper-room.mp3" />
</audio>

      <div className="letter-wrapper">

        <div className={`notebook ${burned ? "show" : ""}`}>

          <div className="love-text">
            {shownText}
          </div>

        </div>

      </div>

    </div>
  );
}
