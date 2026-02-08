import { useEffect, useState } from "react";

export default function Petals() {

  const [petals, setPetals] = useState([]);

  useEffect(() => {

    const timer = setInterval(() => {

      setPetals((p) => [
        ...p,
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          size: 12 + Math.random() * 18,
          duration: 8 + Math.random() * 10,
          rotate: Math.random() * 360,
          blur: Math.random() * 2,
        },
      ]);

    }, 700);

    return () => clearInterval(timer);

  }, []);

  return (
    <div className="petals">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
            filter: `blur(${p.blur}px)`
          }}
        >
          🌸
        </span>
      ))}
    </div>
  );
}
