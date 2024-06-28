import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "./PlayerContext";
import { MusicContext } from "./MusicContext";

export const PlayerProvider = ({ children }) => {
  const [showPlayer, setShowPlayer] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlistSongs, setPlaylistSongs] = useState(null);
  const [queueSongs, setQueueSongs] = useState(null);
  const [songsList, setSongsList] = useState(null);
  const audioRef = useRef(null);
  const { queue, selectedPlaylist } = useContext(MusicContext);

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
  };

  const checkPlaylistPlaying = (id) => {
    return playlistSongs && playlistSongs.id === id ;
  };

  const playPlaylist = () => {
    setPlaylistSongs(selectedPlaylist);
    setQueueSongs(null);
  };

  const playQueue = () => {
    setQueueSongs(queue);
    setPlaylistSongs(null);
    console.log('play')
  };

  const playNextInQueue = () => {
    if (queue.length > 0) {
      const nextSong = songsList[0];
      setSongsList(songsList.slice(1));
      setCurrentSong(nextSong);
    } else if (selectedPlaylist && selectedPlaylist.songs.length > 0) {
      const nextSong = songsList[0];
      setSongsList(songsList.slice(1));
      setCurrentSong(nextSong);
    }
  };

  useEffect(() => {
    if (currentSong && audioRef.current) {
      const src = currentSong.preview;
      audioRef.current.src = src;
      audioRef.current.play();
      setIsPlaying(true);

      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [currentSong, audioRef, setIsPlaying, setDuration, setCurrentTime]);

  useEffect(() => {
    if (playlistSongs && playlistSongs.songs.length > 0) {
      setCurrentSong(playlistSongs.songs[0]);
      setSongsList(playlistSongs.songs.slice(1));
      setPlaylistSongs(null)
    } else if (queueSongs && queueSongs.length > 0) {
      setCurrentSong(queueSongs[0]);
      setSongsList(queueSongs.slice(1));
      setQueueSongs(null)
    }
  }, [playlistSongs, queueSongs]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", playNextInQueue);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("ended", playNextInQueue);
        }
      };
    }
  }, [songsList]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        setIsPlaying,
        togglePlayPause,
        audioRef,
        setCurrentSong,
        checkIsPlaying,
        checkPlaylistPlaying,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        playPlaylist,
        setPlaylistSongs,
        setSongsList,
        playQueue,
        showPlayer,
        setShowPlayer
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
