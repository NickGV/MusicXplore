import "./Player.css";
import images from "../../assets/images.jpg";
import {
  Favorite,
  FavoriteBorder,
  PlaylistAdd,
  Add,
  Check,
} from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { PlayerControls } from "./PlayerControls";
import { MusicContext } from "../../context/MusicContext";
import { PlaylistItem } from "../Playlist/PlaylistItem";

export const Player = () => {
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    addToFavorites,
    removeFromFavorites,
    addSongToPlaylist,
    removeSongFromPlaylist,
    setIsPlaylistFormVisible,
    favoriteMusic,
    playlists,
  } = useContext(MusicContext);

  const { currentSong, audioRef } = useContext(PlayerContext);
  console.log(audioRef)

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(currentSong.id);
    } else {
      const favoriteSong = {
        id: currentSong.id,
        name: currentSong.name,
        artists: currentSong.artists,
        image: currentSong.image,
        preview: currentSong.preview,
      };
      addToFavorites(favoriteSong);
    }
  };

  useEffect(() => {
    if (currentSong) {
      const isFav = favoriteMusic.some((item) => item.id === currentSong.id);
      setIsFavorite(isFav);
    }
    return;
  }, [favoriteMusic]);

  const togglePlaylists = () => {
    setShowPlaylists(!showPlaylists);
  };

  const handleAddToPlaylist = (playlistId) => {
    const song = {
      id: currentSong.id,
      name: currentSong.name,
      artists: currentSong.artists,
      image: currentSong.image,
      preview: currentSong.preview,
    };
    if (!isSongInPlaylist(song, playlistId)) {
      console.log(song, playlistId, "added");
      addSongToPlaylist(song, playlistId);
      setShowPlaylists(false);
    }
  };

  const handleRemoveToPlaylist = (playlistId) => {
    removeSongFromPlaylist(currentSong.id, playlistId);
  };

  const isSongInPlaylist = (currentSong, playlistId) => {
    const playlist = playlists.find((pl) => pl.id === playlistId);
    if (!playlist) return false;
    return playlist.songs.some((s) => s.id === currentSong.id);
  };

  // useEffect(() => {
  //   if (audioRef && audioRef.current && currentSong) {
  //     audioRef.current.src = currentSong.preview;
  //     audioRef.current.play();
  //   }
  // }, [currentSong, audioRef]);

  if (!currentSong)
    return (
      <section className="player">
        <div className="player__text">
          <div className="player__img-container">
            <img src={images} alt="" className="player__img" />
          </div>
          <div>
            <h2 className="player__title">Song</h2>
            <div className="player__description">
              <p className="player__author">Author</p>
            </div>
          </div>
        </div>
        <h1>Select a song</h1>
        <div></div>
      </section>
    );

  return (
    <section className="player">
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

      <PlayerControls />

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
          onClick={togglePlaylists}
        >
          <PlaylistAdd className="player__button-icon" />
        </button>
        {showPlaylists && (
          <div className="playlists-dropdown">
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <div key={playlist.id} className="playlist-dropdown__playlist">
                  <PlaylistItem
                    viewType={"list--smaller"}
                    key={playlist.id}
                    id={playlist.id}
                    name={playlist.name}
                    owner={playlist.owner}
                    image={playlist.image}
                  />
                  {isSongInPlaylist(currentSong, playlist.id) ? (
                    <button
                      type="button"
                      onClick={() => handleRemoveToPlaylist(playlist.id)}
                    >
                      <Check />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAddToPlaylist(playlist.id)}
                    >
                      <Add />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="playlist-item">No playlists available</div>
            )}
            <button
              type="button"
              className="addplaylist-btn"
              onClick={() => setIsPlaylistFormVisible(true)}
            >
              <Add />
              add new playlists
            </button>
          </div>
        )}
      </div>
      <audio ref={audioRef} autoPlay>
        Tu navegador no soporta el elemento <code>audio</code>.
      </audio>
    </section>
  );
};
