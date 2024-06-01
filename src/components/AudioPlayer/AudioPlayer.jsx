import "./AudioPlayer.css";
import images from "../../assets/images.jpg";
import {
  PlayArrow,
  Stop,
  Repeat,
  SkipPrevious,
  SkipNext,
  Shuffle,
  VolumeUp,
  VolumeOff,
  MoreVert,
  Favorite,
  FavoriteBorder,
  PlaylistAdd,
  QueueMusic,
} from "@mui/icons-material";
import { useState } from "react";

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);


  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  return (
    <section className="player">
      <div className="player__text">
        <div className="player__img-container">
          <img src={images} alt="" className="player__img" />
        </div>
        <div>
          <h2 className="player__title">Soulful rhythms</h2>
          <div className="player__description">
            <p className="player__author">Author: soul</p>
          </div>
        </div>
      </div>

      <div className="player__controls">
        <button type="button" className="player__button">
          <Repeat className="player__button-icon" />
        </button>

        <button type="button" className="player__button">
          <SkipPrevious className="player__button-icon" />
        </button>

        <button
          type="button"
          className="player__button"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Stop className="player__button-icon" />
          ) : (
            <PlayArrow className="player__button-icon" />
          )}
        </button>

        <button type="button" className="player__button">
          <SkipNext className="player__button-icon" />
        </button>

        <button
          type="button"
          className="player__button"
        >
          <Shuffle className="player__button-icon" />
        </button>
      </div>

      <div className="player__options">
        <button type='button' className='player__button'>
          <VolumeUp className="player__button-icon"/>
        </button> 
        <button
              type="button"
              className="player__button"
            >
              <PlaylistAdd className="player__button-icon" />
            </button>
            <button
              type="button"
              className="player__button"
            >
              <FavoriteBorder className="player__button-icon" />
            </button>
      </div>
    </section>
  );
};
