import { client } from "../data/client";

export default function Welcome({ next }) {
  return (
    <div className="card">

      <h1>{client.welcome}</h1>

      <p>Tap to open your surprise 💝</p>

      <button onClick={next}>
        Open ❤️
      </button>

    </div>
  );
}
