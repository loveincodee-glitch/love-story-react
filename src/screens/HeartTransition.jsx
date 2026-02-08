import { useEffect } from "react";

export default function HeartTransition({ next }) {

  useEffect(() => {

    const t = setTimeout(() => {
      next();
    }, 2600);

    return () => clearTimeout(t);

  }, [next]);

  return (
    <div className="heart-screen">

      <img
        src="/heart-pink.gif"
        className="heart-big"
        alt="Heart"
      />

      {/* Soft glow only */}
      <div className="heart-glow" />

    </div>
  );
}
