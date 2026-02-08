import { useEffect } from "react";

export default function CelebrationIntro({ next }) {

  useEffect(() => {
    const t = setTimeout(next, 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="cinema-alert">

      <div className="alert-box">

        <h1>💍 YOU FOUND THE RING 💍</h1>

        

      </div>

    </div>
  );
}
