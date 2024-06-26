import { useContext,  useRef,  } from "react";
import "./QueueItem.css";
import { Delete } from "@mui/icons-material";
import { MusicContext } from "../../context/MusicContext";
import { PlayerContext } from "../../context/PlayerContext";

export const QueueItem = ({ id, name, image, artists, preview }) => {
  const queueItemRef = useRef(null);
  const { removeSongFromQueue } = useContext(MusicContext);
  const { playSong, checkIsPlaying } = useContext(PlayerContext);

  const handleClick = (event) => {
    if (
      event.target.closest('.queue-item__button--remove') 
    ) {
      return;
    }
    const song = {
      id,
      name,
      image,
      artists,
      preview,
    };
    playSong(song);
  };

  const songIsPlaying = checkIsPlaying(id);


  return (
    <div
      ref={queueItemRef}
      className={`queue-item
       ${songIsPlaying ? "queue-item--active" : ""}`}
      onClick={handleClick}
    >
      <div className="queue-item__details">
        <div className="queue-item__img-container">
          <img src={image} alt="" className="queue-item__img" />
        </div>
        <div>
          <h2 className="queue-item__title">{name}</h2>
          <div className="queue-item__description">
            <p className="queue-item__artist">{artists}</p>
          </div>
        </div>
      </div>
      <div
        className="queue-item__button queue-item__button--remove"
        onClick={() => removeSongFromQueue(id)}
      >
        <Delete className="queue-item__button-icon" />
      </div>
    </div>
  );
};
