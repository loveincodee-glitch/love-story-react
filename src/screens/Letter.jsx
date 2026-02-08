import { useEffect, useState } from "react";
import { client } from "../data/client";

export default function Letter() {

  const [text, setText] = useState("");
  const full = client.letter;

  useEffect(() => {

    let i = 0;

    const timer = setInterval(() => {

      setText(full.slice(0, i));
      i++;

      if (i > full.length) clearInterval(timer);

    }, 35);

    return () => clearInterval(timer);

  }, [full]);

  return (
    <div className="book">

      <div className="page">

        <h2>My Love ❤️</h2>

        <pre>
          {text}
        </pre>

        <p className="sign">
          — {client.him}
        </p>

      </div>

    </div>
  );
}
