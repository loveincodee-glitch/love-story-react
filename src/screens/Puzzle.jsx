import { useState } from "react";

export default function Puzzle({ next, startFade }) {

  const [ringIndex] = useState(() =>
    Math.floor(Math.random() * 9)
  );

  const [opened, setOpened] = useState([]);
  const [found, setFound] = useState(false);

  function handleClick(i) {

    if (opened.includes(i) || found) return;

    setOpened(prev => [...prev, i]);

    if (i === ringIndex) {

      setFound(true);

    

      setTimeout(next, 2000);
    }
  }

  return (
    <div className="card">

      <h1>Find The Ring 💍</h1>
      <p>One box hides something special...</p>

      <div className="puzzle-grid">

        {Array(9).fill(0).map((_, i) => (

          <div
            key={i}
            className={`puzzle-box ${
              opened.includes(i) ? "open" : ""
            }`}
            onClick={() => handleClick(i)}
          >

            {opened.includes(i) &&
              (i === ringIndex ? "💍" : "❌")}

          </div>

        ))}

      </div>

      {found && (
        <h2 className="found-text fade-in">
          💍 You found the ring!
        </h2>
      )}

    </div>
  );
}
