import "./Queue.css";
import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";
import { QueueItem } from "./QueueItem";
import { PlayerContext } from "../../context/PlayerContext";

export const Queue = ({className}) => {
  const { queue } = useContext(MusicContext);
  const { playQueue } = useContext(PlayerContext);
  return (
    <section className={`queue ${className}`}>
     <div className="queue__header">
       <h1 className="queue__title">Queue</h1>
       <button onClick={playQueue} className="play-btn">Play</button>
     </div>
      <div className="queue__list">
        {queue &&
          queue.map((item) => (
            <QueueItem
              key={item.id}
              id={item.id}
              name={item.name}
              artists={item.artists}
              image={item.image}
              preview={item.preview}
            />
          ))}
      </div>
    </section>
  );
};
