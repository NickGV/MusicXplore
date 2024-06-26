import "./PlaylistItem.css";
import { getPlaylist } from "../../api/spotifyService";
import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";

export const PlaylistItem = ({ viewType, id, name, owner, image, songs = null }) => {
  const author_spotify = owner.external_urls.spotify || "#";
  const display_name  = owner?.display_name || "Unknown";

  const { setSelectedPlaylist } = useContext(MusicContext);

  const handleSelect = () => {
    const selectedPlaylist = {
      id,
      name,
      owner,
      image,
      songs,
    };
    setSelectedPlaylist(selectedPlaylist);
  };

  return (
    <div className={`playlist ${viewType}`} onClick={handleSelect}>
      <div className="playlist__details">
        <div className="playlist__img-container">
          <img src={image} alt="" className="playlist__img" />
        </div>
        <div>
          <h2 className="playlist__title">{name}</h2>
          <div className="playlist__description">
            <p className="playlist__author">
              <a href={author_spotify} target="_blank">
                {display_name}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
