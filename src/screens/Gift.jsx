import { useState } from "react";

export default function Gift({ next }) {

  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);

    setTimeout(() => {
      next();
    }, 2000);
  }

  return (
    <div className="card">

      <h1>A Gift For You 🎁</h1>

      {!open ? (
        <>
          <div className="gift-box closed">
            🎁
          </div>

          <p>Tap to open your surprise 💝</p>

          <button onClick={handleOpen}>
            Open Gift ❤️
          </button>
        </>
      ) : (
        <>
          <div className="gift-box open">
            ✨💖✨
          </div>

          <p>Opening...</p>
        </>
      )}

    </div>
  );
}
