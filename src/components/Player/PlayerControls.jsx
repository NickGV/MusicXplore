import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import {
  PlayArrow,
  Stop,
  Repeat,
  SkipPrevious,
  SkipNext,
  Shuffle,
} from "@mui/icons-material";
import "./PlayerControls.css";

export const PlayerControls = () => {
  const { isPlaying, togglePlayPause } = useContext(PlayerContext);

  return (
    <div className="player__controls">
      {/* <button type="button" className="player__button">
        <Shuffle className="player__button-icon" />
      </button>
      <button type="button" className="player__button">
        <SkipPrevious className="player__button-icon" />
      </button> */}

      <button
        type="button"
        className="player__button player__button--play"
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <Stop className="player__button-icon" />
        ) : (
          <PlayArrow className="player__button-icon" />
        )}
      </button>

      {/* <button type="button" className="player__button">
        <SkipNext className="player__button-icon" />
      </button>

      <button type="button" className="player__button">
        <Repeat className="player__button-icon" />
      </button> */}
    </div>
  );
};
