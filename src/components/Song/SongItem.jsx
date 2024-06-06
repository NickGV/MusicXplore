import { useState } from "react";
import "./SongItem.css";
import images from "../../assets/images.jpg";

import {
  PlaylistAdd,
  QueueMusic,
  PlayArrow,
  Stop,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

export const SongItem = ({ viewType, id, name, artists }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  console.log(viewType)

  return (
    <div
      className={`song ${viewType === "grid" ? "song--grid" : "song--list"} ${isPlaying ?'song--active' :''}`}
      onClick={()=>setIsPlaying(!isPlaying)}
    >
      <div className="song__details">
        <div className="song__img-container">
          <img src={images} alt="" className="song__img" />
        </div>
        <div>
          <h2 className="song__title">{name}</h2>
          <div className="song__description">
            {/* <p className="song__author">{artists.map(artist => artist.name).join(', ')}</p> */}
            <span className="song__duration">3 min 30 sec</span>
          </div>
        </div>
      </div>
      <div className="song__buttons">
        <button type="button" className="song__button">
          <PlaylistAdd className="song__button-icon" />
        </button>
        <button
          type="button"
          className="song__button"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? (
            <Favorite className="song__button-icon" />
          ) : (
            <FavoriteBorder className="song__button-icon" />
          )}
        </button>
        <button type="button" className="song__button">
          <QueueMusic className="song__button-icon" />
        </button>
        <button
          type="button"
          className="song__button"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Stop className="song__button-icon" />
          ) : (
            <PlayArrow className="song__button-icon" />
          )}
        </button>
      </div>
    </div>
  );
};
