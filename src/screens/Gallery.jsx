import { useEffect, useRef, useState } from "react";
import { client } from "../data/client";

export default function Gallery({ next }) {
  
useEffect(() => {
  music.fadeIn(1200);

  return () => {
    music.fadeOut(1200);
  };
}, []);
  const trackRef = useRef(null);
  const audioRef = useRef(null);
  const rafRef = useRef(null);

  const [loaded, setLoaded] = useState(false);


  /* ========================
     PRELOAD IMAGES
  ======================== */

  useEffect(() => {

    let count = 0;

    const images = client.photos;

    images.forEach(src => {

      const img = new Image();

      img.src = src;

      img.onload = () => {

        count++;

        if (count === images.length) {
          setLoaded(true);
        }
      };

    });

  }, []);





  /* ========================
     AUTO SCROLL
  ======================== */

  useEffect(() => {

    if (!loaded) return;

    const track = trackRef.current;

    let pos = 0;
    let running = true;
    let paused = false;

    function pause() {
  paused = true;
}

function resume() {
  paused = false;
}

track.addEventListener("mouseenter", pause);
track.addEventListener("mouseleave", resume);

track.addEventListener("touchstart", pause);
track.addEventListener("touchend", resume);


    function animate() {

  if (!running) return;

  if (!paused) {
    pos += 0.25;

    if (pos >= track.scrollWidth / 2) {
      pos = 0;
    }

    track.style.transform =
      `translate3d(-${pos}px,0,0)`;
  }

  rafRef.current = requestAnimationFrame(animate);
}


    animate();

    return () => {
  running = false;

  track.removeEventListener("mouseenter", pause);
  track.removeEventListener("mouseleave", resume);

  track.removeEventListener("touchstart", pause);
  track.removeEventListener("touchend", resume);

  cancelAnimationFrame(rafRef.current);
};


  }, [loaded]);


  
  /* ========================
     LOADING SCREEN
  ======================== */

  if (!loaded) {

    return (
      <div className="card wide gallery-loader">

        <h1>Loading Memories 💕</h1>

        <p>Please wait… ✨</p>

      </div>
    );
  }


  /* ========================
     MAIN UI
  ======================== */

  return (

    <div className="card wide">

      <h1>Our Memories ❤️</h1>


      <div className="lux-gallery">


        {/* Shimmer Overlay */}
        <div className="gallery-shimmer" />


        <div className="lux-track" ref={trackRef}>

          {[...client.photos, ...client.photos].map((img, i) => (

            <div className="lux-frame" key={i}>
              <img src={img} alt="" />
            </div>

          ))}

        </div>

      </div>


      <p>Every moment with you is magic ✨</p>


      <button onClick={next}>
        Continue 💕
      </button>

    </div>
  );
}
