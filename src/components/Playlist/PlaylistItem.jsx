import "./PlaylistItem.css";

import { Add } from "@mui/icons-material";

export const PlaylistItem = ({ viewType, id, name, owner, image }) => {
  const author_spotify = owner.external_urls.spotify;
  const { display_name } = owner;
  return (
    <div className={`playlist ${viewType}`}>
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
