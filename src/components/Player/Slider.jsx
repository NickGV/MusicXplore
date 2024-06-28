import { useContext } from "react";
import "./Slider.css";
import { PlayerContext } from "../../context/PlayerContext";

export const Slider = ({ onValueChange }) => {
  const { currentTime, duration } = useContext(PlayerContext);

  const handleSliderChange = (event) => {
    onValueChange(event.target.value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const sliderBackground = {
    background: `linear-gradient(to right, var(--accent-color) ${
      (currentTime / duration) * 100
    }%, #444 ${(currentTime / duration) * 100}%)`,
  };

  return (
    <div className="slider-container">
      <span>{formatTime(currentTime)}</span>
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSliderChange}
        className="slider"
        style={sliderBackground}
      />
      <span>{formatTime(duration)}</span>
    </div>
  );
};
