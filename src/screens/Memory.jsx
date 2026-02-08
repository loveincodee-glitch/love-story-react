import { useRef, useState } from "react";

export default function Memory({ next }) {

  const params = new URLSearchParams(window.location.search);

  const her = params.get("her") || "My Love";
  const him = params.get("him") || "Me";

  const meet = params.get("meet") || "The Day We Met";
  const firstChat = params.get("chat") || "Our First Message";
  const firstLove = params.get("love") || "The Day I Fell For You";
  const forever = params.get("forever") || "Every Lifetime With You";


  const memories = [
    { id: 1, icon: "💬", title: "First Chat", text: firstChat },
    { id: 2, icon: "🤍", title: "First Meet", text: meet },
    { id: 3, icon: "❤️", title: "First Love", text: firstLove },
    { id: 4, icon: "♾️", title: "Forever", text: forever },
  ];


  const [openId, setOpenId] = useState(null);

  const doneRef = useRef(false);


  function openMemory(id) {
    setOpenId(id);
  }


  function closeMemory() {
    setOpenId(null);
  }


  function goNext() {

    if (doneRef.current) return;

    doneRef.current = true;

    next();
  }


  return (
    <div className="card wide memory-card">


      {/* Header */}
      <div className="memory-head fade-in">

        <h1>Our Story ❤️</h1>

        <p>
          {him} & {her}
        </p>

      </div>


      {/* Grid */}
      <div className="memory-grid">

        {memories.map(m => (

          <button
            key={m.id}
            className="memory-tile"
            onClick={() => openMemory(m.id)}
          >

            <span>{m.icon}</span>

            <h3>{m.title}</h3>

          </button>

        ))}

      </div>


      {/* Modal */}
      {openId && (

        <div
          className="memory-modal"
          onClick={closeMemory}
        >

          <div
            className="memory-modal-box"
            onClick={e => e.stopPropagation()}
          >

            <span className="memory-big-icon">
              {memories.find(m => m.id === openId)?.icon}
            </span>

            <h2>
              {memories.find(m => m.id === openId)?.title}
            </h2>

            <p>
              {memories.find(m => m.id === openId)?.text}
            </p>


            <div className="memory-actions">

              <button onClick={closeMemory}>
                Close 💗
              </button>

              {openId === 4 && (

                <button
                  className="memory-next"
                  onClick={goNext}
                >
                  Continue ✨
                </button>

              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
