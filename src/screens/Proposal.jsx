import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { client } from "../data/client";

export default function Proposal({ next }) {

  const [phase, setPhase] = useState("enter");
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);


  const noBtnRef = useRef(null);

  const noTexts = [
    "No 😒",
    "Are you sure? 😏",
    "Think again 🥺",
    "Really?? 😭",
    "Last chance 💔",
  ];


  /* Timeline */

  useEffect(() => {

    const t = [];

    // Text reveal
    t.push(setTimeout(() => setPhase("ask"), 1200));

    return () => t.forEach(clearTimeout);

  }, []);


  /* Confetti */

  function celebrate() {

    const fire = confetti.create(null, {
      resize: true,
      useWorker: true,
    });

    for (let i = 0; i < 6; i++) {

      setTimeout(() => {

        fire({
          particleCount: 180,
          spread: 110,
          startVelocity: 38,
          gravity: 0.75,
          ticks: 280,

          origin: {
            x: Math.random() * .8 + .1,
            y: Math.random() * .4,
          },

          colors: ["#ff4d6d", "#ffd1dc", "#ffffff", "#ff9acb"],
        });

      }, i * 260);
    }
  }


  /* No Run */

  function runAway() {

    if (!noBtnRef.current) return;

    const x = (Math.random() - 0.5) * 240;
    const y = (Math.random() - 0.5) * 160;

    noBtnRef.current.style.transform =
      `translate(${x}px, ${y}px) scale(.9)`;
  }


  function handleNo() {
    setNoCount(c => Math.min(c + 1, 4));
    setYesScale(s => Math.min(s + 0.12, 1.6));
  }


  /* YES */

  function handleYes() {

    if (phase !== "ask") return;

    setPhase("yes");

    celebrate();

    setTimeout(next, 3200);
  }


  return (

    <div className={`proposal-screen phase-${phase}`}>

      <div className="proposal-spotlight" />


      <div className="proposal-card">


        {/* Media */}

        <div className="proposal-media">

          {phase !== "yes" && (
            <img
              src="/peachcat-cat.gif"
              className="proposal-gif"
              alt=""
            />
          )}

          {phase === "yes" && (
            <img
              src="/bubu-kiss-dudu.gif"
              className="proposal-big-gif"
              alt=""
            />
          )}

        </div>


        {/* Text */}

       <h1 className="proposal-text">

  {phase !== "yes" && (

    <>
      <span className="word">Will</span>
      <span className="word">you</span>
      <span className="word">be</span>
      <span className="word">my</span>
      <span className="word">valentine</span>

      <span className="forever">
        forever
        <span className="ring-float">💍</span>
      </span>

      <span className="qmark">?</span>
    </>
  )}

  {phase === "yes" && "I knew you would ❤️"}

</h1>



        {/* Buttons */}

        {phase === "ask" && (

          <div className="btn-row">

            <div
  className="yes-wrap"
  style={{ transform: `scale(${yesScale})` }}
>
  <button
    className="yes-btn pulse"
    onClick={handleYes}
  >
    YES ❤️
  </button>
</div>



            <button
              ref={noBtnRef}
              className="no-btn"
              onMouseEnter={runAway}
              onTouchStart={runAway}
              onClick={handleNo}
            >
              {noTexts[noCount]}
            </button>

          </div>
        )}

      </div>

    </div>
  );
}
