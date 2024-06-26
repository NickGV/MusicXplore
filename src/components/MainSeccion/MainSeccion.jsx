import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";
import { Favorites } from "../Favorites/Favorites";
``;
import { Playlist } from "../Playlist/Playlist";
import { Discover } from "../Search/Discover";
import { NavBar } from "../NavBar/NavBar";
import { Queue } from "../Queue/Queue";
import { Routes, Route } from "react-router-dom";

import "./MainSeccion.css";
import { PlaylistForm } from "../Playlist/PlaylistForm";

export const MainSeccion = () => {
  const { selectedPlaylist, isPlaylistFormVisible, setIsPlaylistFormVisible } = useContext(MusicContext);

  return (
    <main className="main">
      <NavBar />

      {selectedPlaylist ? (
        <Playlist />
      ) : (
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      )}

      <Queue />
      {isPlaylistFormVisible && (
        <PlaylistForm onClose={() => setIsPlaylistFormVisible(false)} />
      )}
    </main>
  );
};
