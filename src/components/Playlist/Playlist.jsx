import { useContext, useEffect, useState } from "react";
import { MusicContext } from "../../context/MusicContext";
import {
  ArrowBack,
  PlayCircle,
  StopCircle,
  Shuffle,
  CheckCircleRounded,
  AddCircleOutline,
} from "@mui/icons-material";
import { SongItem } from "../Song/SongItem";
import { getPlaylist } from "../../api/spotifyService";

import "./Playlist.css";

export const Playlist = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [songs, setSongs] = useState(null);

  const {
    selectedPlaylist,
    setSelectedPlaylist,
    addPlaylist,
    removePlaylist,
    playlists,
    removeSongFromPlaylist,
  } = useContext(MusicContext);

  const handleBack = () => {
    setSelectedPlaylist(null);
  };

  useEffect(() => {
    if (selectedPlaylist.songs === null) {
      const getPlaylistSongs = async () => {
        if (!selectedPlaylist) return null;
        const response = await getPlaylist(selectedPlaylist.id);

        const formattedSongs = response.tracks.items.map((item) => ({
          id: item.track.id,
          name: item.track.name,
          artists: item.track.artists.map((artist) => artist.name).join(", "),
          image: item.track.album.images[0]?.url || "",
          preview: item.track.preview_url
        }));
        setSongs(formattedSongs);
      };
      getPlaylistSongs();
    }
    setSongs(selectedPlaylist.songs);
  }, [selectedPlaylist]);

  useEffect(() => {
    const isAdd = playlists.some((item) => item.id === selectedPlaylist.id);
    setIsAdd(isAdd);
  }, [playlists]);

  const handleAdd = () => {
    if (isAdd) {
      removePlaylist(selectedPlaylist.id);
    } else {
      const playlist = {
        id: selectedPlaylist.id,
        name: selectedPlaylist.name,
        owner: selectedPlaylist.owner,
        image: selectedPlaylist.image,
        songs: songs,
      };
      addPlaylist(playlist);
    }
  };

  const handlePlay = () => {
    return;
  };

  const handleShuffle = () => {
    return;
  };

  return (
    <div className="playlist-view">
      <button type="button" className="back-button" onClick={handleBack}>
        <ArrowBack />
      </button>

      <div className="playlist-view__info">
        <div className="playlist-view__img-container">
          <img
            src={selectedPlaylist.image}
            alt="playlist-img"
            className="playlist-view__img"
          />
        </div>
        <div className="playlist-view__description">
          <span>Playlist</span>
          <h1 className="playlist-view__title">{selectedPlaylist.name}</h1>

          <p className="playlist-view__owner">
            {selectedPlaylist.owner.display_name}
          </p>
        </div>
      </div>

      <div className="playlist-view__options">
        <button
          type="button"
          className="playlist-view__button playlist-view__button--big"
        >
          <PlayCircle className="playlist-view__icon playlist-view__icon--big" />
        </button>
        <button type="button" className="playlist-view__button">
          <Shuffle className="playlist-view__icon" />
        </button>
        <button
          type="button"
          className="playlist-view__button"
          onClick={handleAdd}
        >
          {isAdd ? (
            <CheckCircleRounded className="playlist-view__icon playlist-view__icon--active" />
          ) : (
            <AddCircleOutline className="playlist-view__icon" />
          )}
        </button>
      </div>

      <div className="playlist-view__songs">
        {songs &&
          songs.map((song) => (
            <SongItem
              viewType={"list"}
              key={song.id}
              id={song.id}
              name={song.name}
              image={song.image}
              artists={song.artists}
              preview={song.preview}
            />
          ))}
      </div>
    </div>
  );
};
