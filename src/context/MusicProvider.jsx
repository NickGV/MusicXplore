import {  useEffect, useState } from "react";
import { MusicContext } from "./MusicContext";

export const MusicProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteMusic, setFavoriteMusic] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [queue, setQueue] = useState([]);
  const [result, setResult] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isPlaylistFormVisible, setIsPlaylistFormVisible] = useState(false);

  useEffect(() => {
    setFavoriteMusic(JSON.parse(localStorage.getItem("favoriteMusic")) || []);
    setPlaylists(JSON.parse(localStorage.getItem("playlists")) || []);
    setQueue(JSON.parse(localStorage.getItem("queue")) || []);
    console.log("done");
  }, []);

  const handleResults = async (results) => {
    const tracksUpdated = await results.tracks.items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist) => artist.name).join(", "),
        image: item.album.images[0].url,
        preview: item.preview_url,
      };
    });
    const playlistsUpdated = await results.playlists.items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        owner: item.owner,
        image: item.images[0].url,
      };
    });
    const tracks = {
      ...results.tracks,
      items: tracksUpdated,
    };

    const playlists = {
      ...results.playlists,
      items: playlistsUpdated,
    };
    setResult({ tracks, playlists });
  };

  const addToFavorites = (song) => {
    const updatedFavorites = [...favoriteMusic];
    updatedFavorites.push(song);
    setFavoriteMusic(updatedFavorites);
    localStorage.setItem("favoriteMusic", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (id) => {
    const updatedFavorites = favoriteMusic.filter((song) => song.id !== id);
    setFavoriteMusic(updatedFavorites);
    localStorage.setItem("favoriteMusic", JSON.stringify(updatedFavorites));
  };

  const addSongToQueue = (song) => {
    const updatedQueue = [...queue];
    updatedQueue.push(song);
    setQueue(updatedQueue);
    localStorage.setItem("queue", JSON.stringify(updatedQueue));
  };

  const removeSongFromQueue = (id) => {
    const updatedQueue = queue.filter((song) => song.id !== id);
    setQueue(updatedQueue);
    localStorage.setItem("queue", JSON.stringify(updatedQueue));
  };

  const addPlaylist = (playlist) => {
    const updatedPlaylists = [...playlists];
    updatedPlaylists.push(playlist);
    setPlaylists(updatedPlaylists);
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
  };

  const removePlaylist = (id) => {
    const updatedPlaylists = playlists.filter((playlist) => playlist.id !== id);
    setPlaylists(updatedPlaylists);
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
  };

  const addSongToPlaylist = (song, playlistId) => {
    const formattedSong = {
      id: song.id,
      name: song.name,
      artists: song.artists,
      image: song.image,
      preview: song.preview,
    };

    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        const updatedSongs = playlist.songs
          ? [...playlist.songs, formattedSong]
          : [formattedSong];
        return {
          ...playlist,
          songs: updatedSongs,
          image: playlist.image || song.image,
        };
      }
      return playlist;
    });
    setPlaylists(updatedPlaylists);
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
    console.log("Adding song to playlist");
  };

  const removeSongFromPlaylist = (songId, playlistId) => {
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        const updatedSongs = playlist.songs.filter(
          (song) => song.id !== songId
        );
        const newImage = updatedSongs.length > 0 ? updatedSongs[0].image : "";
        return { ...playlist, songs: updatedSongs, image: newImage };
      }
      return playlist;
    });

    setSelectedPlaylist((prevSelectedPlaylist) => {
      if (prevSelectedPlaylist && prevSelectedPlaylist.id === playlistId) {
        const updatedSongs = prevSelectedPlaylist.songs.filter(
          (song) => song.id !== songId
        );
        const newImage = updatedSongs.length > 0 ? updatedSongs[0].image : "";
        return {
          ...prevSelectedPlaylist,
          songs: updatedSongs,
          image: newImage,
        };
      }
      return prevSelectedPlaylist;
    });

    setPlaylists(updatedPlaylists);
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
  };

  return (
    <MusicContext.Provider
      value={{
        isLoading,
        setIsLoading,
        favoriteMusic,
        setFavoriteMusic,
        result,
        setResult,
        handleResults,
        addToFavorites,
        removeFromFavorites,
        addPlaylist,
        removePlaylist,
        addSongToQueue,
        removeSongFromQueue,
        queue,
        setQueue,
        playlists,
        selectedPlaylist,
        setSelectedPlaylist,
        isPlaylistFormVisible,
        setIsPlaylistFormVisible,
        addSongToPlaylist,
        removeSongFromPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
