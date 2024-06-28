import { Favorite, FavoriteBorder, PlayArrow, Stop } from "@mui/icons-material";
import "./PlayerMovil.css";
import { PlayerContext } from "../../context/PlayerContext";
import { useContext } from "react";

export const PlayerMovil = ({ handleFavorite, isFavorite, setShowPlayer }) => {
  const { isPlaying, togglePlayPause, currentSong } = useContext(PlayerContext);

  const handleClick = (e) => {
    if (e.target.closest(".player__button-icon")) {
      return;
    }
    setShowPlayer(true);
  };

  return (
    <section className="player-movil" onClick={(e) => handleClick(e)}>
      <div className="player__text">
        <div className="player__img-container">
          <img src={currentSong.image} alt="" className="player__img" />
        </div>
        <div>
          <h2 className="player__title">{currentSong.name}</h2>
          <div className="player__description">
            <p className="player__artists">{currentSong.artists}</p>
          </div>
        </div>
      </div>

      <div className="player__options">
        <button
          type="button"
          className="player__button player__button--favorite"
          onClick={handleFavorite}
        >
          {isFavorite ? (
            <Favorite className="player__button-icon" />
          ) : (
            <FavoriteBorder className="player__button-icon" />
          )}
        </button>
        <button
          type="button"
          className="player__button"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <Stop className="player__button-icon" />
          ) : (
            <PlayArrow className="player__button-icon" />
          )}
        </button>
      </div>
    </section>
  );
};
