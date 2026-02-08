import { useEffect, useState } from "react";
import { client } from "../data/client";

export default function Intro({ next }) {

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {

    let val = 0;

    const timer = setInterval(() => {

      val += 5;
      setProgress(val);

      if (val >= 100) {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 300);
      }

    }, 90);

    return () => clearInterval(timer);

  }, []);

  return (
    <div className="card">

      {loading ? (

        <div className="loader-box">

          <img
            src="/cat-loading.gif"
            className="loader-cat"
            alt=""
          />

          <p>
            Preparing something special… 💕
          </p>

          {/* Progress */}
          <div className="progress-wrap">

            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            />

          </div>

        </div>

      ) : (

        <>
          <h1>{client.intro}</h1>

          <p>
            A little story, just for you… ✨
          </p>

          <button onClick={next}>
            Continue 💖
          </button>
        </>

      )}

    </div>
  );
}
