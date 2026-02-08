import { useEffect, useState } from "react";

const images = [
   "/img/Sakura1.png",
   "/img/Sakura4.png",
  "/img/Sakura3.png",
];


export default function Petals() {

  const [petals, setPetals] = useState([]);

  useEffect(() => {

    const timer = setInterval(() => {

      const depth = Math.random() * 3;

 setPetals(p => {

  const depth = Math.random() * 3;

  const newPetal = {
    id: Date.now() + Math.random(),

    img: images[Math.floor(Math.random() * images.length)],

    left: Math.random() * 100,

    size: 22 + depth * 14,

    duration: 14 + depth * 9,

    blur: depth * 0.7,

    sway: 30 + depth * 35,

    opacity: Math.random() * 0.4 + 0.5,

    delay: Math.random() * 2
  };

  return [...p, newPetal].slice(-35);
});


   }, window.innerWidth < 600 ? 700 : 400);


    return () => clearInterval(timer);

  }, []);

  return (
    <div className="petal-wrap">
      {petals.map(p => (
        <img
          key={p.id}
          src={p.img}
          className="petal"
         style={{
  left: `${p.left}%`,

  width: `${p.size}px`,

  opacity: p.opacity,

  animationDuration: `${p.duration}s`,

  animationDelay: `${p.delay}s`,

  filter: `blur(${p.blur}px)
           drop-shadow(0 6px 12px rgba(255,140,180,.35))`,

  zIndex: Math.round(10 - p.blur),

  '--sway': `${p.sway}px`,
}}

        />
      ))}
    </div>
  );
}
