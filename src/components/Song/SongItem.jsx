import { useContext, useEffect, useRef, useState } from "react";
import "./SongItem.css";
import {
  PlayArrow,
  Stop,
  Favorite,
  FavoriteBorder,
  MoreHoriz,
} from "@mui/icons-material";
import { MusicContext } from "../../context/MusicContext";
import { SongItemMenu } from "./SongItemMenu";
import { PlayerContext } from "../../context/PlayerContext";

export const SongItem = ({ viewType, id, name, image, artists, preview }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const songItemRef = useRef(null);

  const { addToFavorites, removeFromFavorites, favoriteMusic } =
    useContext(MusicContext);
  const { setCurrentSong, checkIsPlaying, togglePlayPause, setShowPlayer } =
    useContext(PlayerContext);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      const favoriteSong = { id, name, image, artists, preview };
      addToFavorites(favoriteSong);
    }
  };

  useEffect(() => {
    const isFav = favoriteMusic.some((item) => item.id === id);
    setIsFavorite(isFav);
  }, [favoriteMusic, id]);

  const handleClickOutside = (event) => {
    if (songItemRef.current && !songItemRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (event) => {
    if (
      event.target.closest(".song__button--favorite") ||
      event.target.closest(".song__button--more") ||
      event.target.closest(".song__menu") ||
      event.target.closest(".song__button-icon--stop")
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
    setShowPlayer(true)
    setCurrentSong(song);
  };

  const songIsPlaying = checkIsPlaying(id);

  return (
    <div
      ref={songItemRef}
      className={`song ${viewType === "grid" ? "song--grid" : "song--list"} ${
        songIsPlaying ? "song--active" : ""
      }`}
      onClick={handleClick}
    >
      <div className="song__details">
        <button type="button" className="song__button song__button--play">
          {songIsPlaying ? (
            <Stop
              className="song__button-icon song__button-icon--stop"
              onClick={togglePlayPause}
            />
          ) : (
            <PlayArrow className="song__button-icon " />
          )}
        </button>
        <div className="song__img-container">
          <img src={image} alt="" className="song__img" />
        </div>
        <div>
          <h2 className="song__title">{name}</h2>
          <div className="song__description">
            <p className="song__artist">{artists}</p>
          </div>
        </div>
      </div>
      <div className="song__buttons">
        <button
          type="button"
          className="song__button song__button--favorite"
          onClick={handleFavorite}
        >
          {isFavorite ? (
            <Favorite className="song__button-icon" />
          ) : (
            <FavoriteBorder className="song__button-icon" />
          )}
        </button>
        <button
          type="button"
          className="song__button song__button--more"
          onClick={() => setShowOptions(!showOptions)}
        >
          <MoreHoriz className="song__button-icon" />
        </button>
        {showOptions && (
          <SongItemMenu
            handleFavorite={handleFavorite}
            isFavorite={isFavorite}
            song={{ id, name, artists, image, preview }}
          />
        )}
      </div>
    </div>
  );
};
