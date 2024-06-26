import { useRef, useState } from "react"
import { PlayerContext } from "./PlayerContext"

export const PlayerProvider = ({children}) => {
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  
  const playSong = (song) => {
    setCurrentSong(song);
    audioRef.current.src = song.preview;
    audioRef.current.play();
    setIsPlaying(true);

  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const checkIsPlaying = (id) => {
    return currentSong && currentSong.id === id && isPlaying;
  }



  return (
    <PlayerContext.Provider value={{
      currentSong,
      isPlaying,
      playSong,
      togglePlayPause,
      audioRef,
      setCurrentSong,
      checkIsPlaying
    }}>
      {children}
    </PlayerContext.Provider>
  )
}
