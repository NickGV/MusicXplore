import "./NavBar.css";
import { NavLink } from "react-router-dom";
import {
  Search,
  LibraryMusic,
  FavoriteBorder,
  ArrowDropDown,
  ArrowDropUp,
} from "@mui/icons-material";
import { PlaylistItem } from "../Playlist/PlaylistItem";
import { useState } from "react";

export const NavBar = () => {
  const [showLibrary, setShowLibrary] = useState(false);
  return (
    <nav className="nav-bar">
      <ul className="nav-bar__links">
        <NavLink to="/">
          <li className="nav-bar__link">
            <Search />
            Discover
          </li>
        </NavLink>
        <NavLink to="/favorites">
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
          <div className="nav-bar__link-icon">
            {showLibrary ? <ArrowDropUp /> : <ArrowDropDown />}
          </div>
        </li>
      </ul>
      {/* {showLibrary && result && (
        <div className="playlist-list">
          {result.playlists.items.map((item) => (
            <PlaylistItem
              viewType={"list--small"}
              key={item.id}
              name={item.name}
              owner={item.owner}
              image={item.image}
            />
          ))}
        </div>
      )} */}
    </nav>
  );
};
