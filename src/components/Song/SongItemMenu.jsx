import {
  PlaylistAdd,
  QueueMusic,
  Favorite,
  FavoriteBorder,
  Add,
  Check,
} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { MusicContext } from "../../context/MusicContext";
import { PlaylistItem } from "../Playlist/PlaylistItem";

import "./SongItemMenu.css";

export const SongItemMenu = ({ handleFavorite, isFavorite, song }) => {
  const [showPlaylists, setShowPlaylists] = useState(false);
  const {
    playlists,
    addSongToPlaylist,
    removeSongFromPlaylist,
    setIsPlaylistFormVisible,
    addSongToQueue,
    queue
  } = useContext(MusicContext);

  const togglePlaylists = () => {
    setShowPlaylists(!showPlaylists);
  };

  const handleAddToPlaylist = (playlistId) => {
    if (!isSongInPlaylist(song, playlistId)) {
      console.log(song, playlistId, "added");
      addSongToPlaylist(song, playlistId);
      setShowPlaylists(false);
    }
  };

  const handleRemoveToPlaylist = (playlistId) => {
    removeSongFromPlaylist(song.id, playlistId);
  };

  const isSongInPlaylist = (song, playlistId) => {
    const playlist = playlists.find((pl) => pl.id === playlistId);
    if (!playlist) return false;
    return playlist.songs.some((s) => s.id === song.id);
  };

  const handleAddToQueue = () => {
    if(!isSongInQueue(song)){
      addSongToQueue(song)
    }
  }

  const isSongInQueue = (song) => {
    return queue.some((s) => s.id === song.id);
  };

  return (
    <div className="song__menu">
      <button
        type="button"
        className="song__menu-button"
        onClick={togglePlaylists}
      >
        <PlaylistAdd className="song__button-icon" /> Add to Playlist
      </button>
      <button type="button" className="song__menu-button" onClick={handleAddToQueue}>
        <QueueMusic className="song__button-icon" /> Add to Queue
      </button>

      <button
        type="button"
        className="song__menu-button"
        onClick={handleFavorite}
      >
        {isFavorite ? (
          <Favorite className="song__button-icon" />
        ) : (
          <FavoriteBorder className="song__button-icon" />
        )}
        Add to favorites
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
                {isSongInPlaylist(song, playlist.id) ? (
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
  );
};
