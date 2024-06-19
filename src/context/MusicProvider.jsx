import { useEffect, useState } from "react";
import { MusicContext } from "./MusicContext";

export const MusicProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteMusic, setFavoriteMusic] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setFavoriteMusic(JSON.parse(localStorage.getItem("favoriteMusic")) || []);
  }, []);

  const handleResults = async (results) => {
    const tracksUpdated = await results.tracks.items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        artist: item.artists[0].name,
        image: item.album.images[0].url,
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
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
