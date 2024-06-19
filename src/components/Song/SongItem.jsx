import { useContext, useEffect, useRef, useState } from "react";
import "./SongItem.css";

import {
  PlaylistAdd,
  QueueMusic,
  PlayArrow,
  Stop,
  Favorite,
  FavoriteBorder,
  MoreHoriz,
} from "@mui/icons-material";
import { MusicContext } from "../../context/MusicContext";

export const SongItem = ({ viewType, id, name, image, artist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const {
    addToFavorites,
    removeFromFavorites,
    favoriteMusic,
    setFavoriteMusic,
  } = useContext(MusicContext);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      const favoriteSong = { id, name, image, artist };
      addToFavorites(favoriteSong);
    }
  };

  useEffect(() => {
    const isFav = favoriteMusic.some((item) => item.id === id);
    setIsFavorite(isFav);
  }, [favoriteMusic, id]);

  useEffect(() => {
    const localFavoriteMusic =
      JSON.parse(localStorage.getItem("favoriteMusic")) || [];
    setFavoriteMusic(localFavoriteMusic);
  }, [setFavoriteMusic]);

  return (
    <div
      className={`song ${viewType === "grid" ? "song--grid" : "song--list"} ${
        isPlaying ? "song--active" : ""
      }`}
    >
      <div className="song__details">
        <button
          type="button"
          className="song__button song__button--play"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Stop className="song__button-icon" />
          ) : (
            <PlayArrow className="song__button-icon" />
          )}
        </button>
        <div className="song__img-container">
          <img src={image} alt="" className="song__img" />
        </div>
        <div>
          <h2 className="song__title">{name}</h2>
          <div className="song__description">
            <p className="song__author">{artist}</p>
            {/* <span className="song__duration">3 min 30 sec</span> */}
          </div>
        </div>
      </div>
      <div className="song__buttons">
        <button type="button" className="song__button" onClick={handleFavorite}>
          {isFavorite ? (
            <Favorite className="song__button-icon" />
          ) : (
            <FavoriteBorder className="song__button-icon" />
          )}
        </button>
        <button
          type="button"
          className="song__button"
          onClick={() => setShowOptions(!showOptions)}
        >
          <MoreHoriz className="song__button-icon" />
        </button>
        {showOptions && (
          <div className="song__options">
            <button type="button" className="song__option-button">
              <PlaylistAdd className="song__button-icon" /> Add to Playlist
            </button>
            <button type="button" className="song__option-button">
              <QueueMusic className="song__button-icon" /> Add to Queue
            </button>

            <button
              type="button"
              className="song__option-button"
              onClick={handleFavorite}
            >
              {isFavorite ? (
                <Favorite className="song__button-icon" />
              ) : (
                <FavoriteBorder className="song__button-icon" />
              )}
              Add to favorites
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
