import "./NavBar.css";
import { NavLink } from "react-router-dom";
import {
  Search,
  LibraryMusic,
  FavoriteBorder,
  Add,
} from "@mui/icons-material";
import { PlaylistItem } from "../Playlist/PlaylistItem";
import { useContext, useState } from "react";
import { MusicContext } from "../../context/MusicContext";

export const NavBar = () => {
  const [showLibrary, setShowLibrary] = useState(false);

  const { setSelectedPlaylist, playlists, setIsPlaylistFormVisible } =
    useContext(MusicContext);

  const changeView = () => {
    setSelectedPlaylist(null);
  };

  return (
    <nav className="nav-bar">
      <ul className="nav-bar__links">
        <NavLink to="/" onClick={changeView}>
          <li className="nav-bar__link">
            <Search />
            Discover
          </li>
        </NavLink>
        <NavLink to="/favorites" onClick={changeView}>
          <li className="nav-bar__link">
            <FavoriteBorder />
            Favorite
          </li>
        </NavLink>
        <li
          className="nav-bar__link nav-bar__link--drop"
          onClick={() => setShowLibrary(!showLibrary)}
        >
          <div className="nav-bar__link-description">
            <LibraryMusic />
            Library
          </div>

          <button
            className="addPlaylist-btn"
            onClick={() => setIsPlaylistFormVisible(true)}
          >
            <Add className="addPlaylist-btn__icon" />
          </button>
        </li>
      </ul>
      {showLibrary && playlists && (
        <div className="playlist-list">
          {playlists.map((item) => (
            <PlaylistItem
              viewType={"list--small"}
              key={item.id}
              id={item.id}
              name={item.name}
              owner={item.owner}
              image={item.image}
              songs={item.songs}
            />
          ))}
        </div>
      )}
    </nav>
  );
};
