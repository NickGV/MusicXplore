import { useContext, useState } from "react";
import { MusicContext } from "../../context/MusicContext";
import "./PlaylistForm.css";

export const PlaylistForm = ({ onClose }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistOwner, setPlaylistOwner] = useState("");
  const { addPlaylist } = useContext(MusicContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlaylist = {
      id: Date.now(),
      name: playlistName,
      owner: {display_name: playlistOwner, external_urls:{spotify: "#"}},
      image: "",
      songs: []
    };
    addPlaylist(newPlaylist);
    onClose();
  };

  return (
    <div className="playlist-form">
      <form onSubmit={handleSubmit}>
        <h2>Create a new playlist</h2>
        <label htmlFor="playlistName" className="playlist-form__label">
          Playlist Name
        </label>
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Playlist name"
          className="playlist-form__input"
          required
        />
        <label htmlFor="playlistOwner" className="playlist-form__label">
          Playlist Owner
        </label>
        <input
          type="text"
          value={playlistOwner}
          onChange={(e) => setPlaylistOwner(e.target.value)}
          placeholder="Playlist Owner"
          className="playlist-form__input"
          required
        />
        <div className="playlist-form__buttons">
          <button
            type="submit"
            className="playlist-form__button playlist-form__button--create"
          >
            Create
          </button>
          <button
            type="button"
            className="playlist-form__button playlist-form__button--cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
