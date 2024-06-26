import "./Queue.css";
import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";
import { QueueItem } from "./QueueItem";

export const Queue = () => {
  const { queue } = useContext(MusicContext);
  return (
    <section className="queue">
      <h1 className="queue__title">Queue</h1>
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
