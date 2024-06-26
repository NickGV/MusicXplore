import { useContext, useState } from "react";
import { SongItem } from "../Song/SongItem";
import "./Discover.css";
import { GridView, FormatListBulleted } from "@mui/icons-material";
import { PlaylistItem } from "../Playlist/PlaylistItem";
import { MusicContext } from "../../context/MusicContext";

export const Discover = () => {
  const [viewType, setViewType] = useState("list");
  const [viewCategory, setViewCategory] = useState("all");

  const { result, isLoading } = useContext(MusicContext);

  const handleLinkClick = (category) => {
    setViewCategory(category);
  };

  return (
    <section className="results">
      <div className="results__header">
        <h1 className="results__title">Results</h1>
        <div className="results__views-btn">
          <button type="button" onClick={() => setViewType("list")}>
            <FormatListBulleted className="results__button-icon" />
          </button>
          <button type="button" onClick={() => setViewType("grid")}>
            <GridView className="results__button-icon" />
          </button>
        </div>
      </div>
      <div className="results__content">
        <ul className="results__links">
          <li className="results__link">
            <a href="#" onClick={() => handleLinkClick("all")}>
              All
            </a>
          </li>
          <span>/</span>

          <li className="results__link">
            <a href="#tracks" onClick={() => handleLinkClick("tracks")}>
              Tracks
            </a>
          </li>
          <span>/</span>
          <li className="results__link">
            <a href="#playlists" onClick={() => handleLinkClick("playlists")}>
              Playlist
            </a>
          </li>
        </ul>
        {isLoading ? (
          <div className="loading-container">
            <div className="loading"></div>
          </div>
        ) : (
          result && (
            <div className="results__container">
              {viewCategory === "all" && (
                <>
                  <h2 className="result__title">Tracks</h2>
                  <div
                    className={`songs-container ${
                      viewType === "grid" ? "grid" : "list"
                    }`}
                    id="tracks"
                  >
                    {result.tracks.items.map((item) => (
                      <SongItem
                        viewType={viewType}
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        artists={item.artists}
                        image={item.image}
                        preview={item.preview}
                      />
                    ))}
                  </div>
                  <h2 className="result__title">Playlists</h2>
                  <div
                    className={`playlists-container ${
                      viewType === "grid" ? "grid" : "list"
                    }`}
                    id="playlists"
                  >
                    {result.playlists.items.map((item) => (
                      <PlaylistItem
                        viewType={viewType}
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        owner={item.owner}
                        image={item.image}
                      />
                    ))}
                  </div>
                </>
              )}
              {viewCategory === "tracks" && (
                <>
                  <h2 className="result__title">Tracks</h2>
                  <div
                    className={`songs-container ${
                      viewType === "grid" ? "grid" : "list"
                    }`}
                    id="tracks"
                  >
                    {result.tracks.items.map((item) => (
                      <SongItem
                        viewType={viewType}
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        artists={item.artists}
                        image={item.image}
                      />
                    ))}
                  </div>
                </>
              )}
              {viewCategory === "playlists" && (
                <>
                  <h2 className="result__title">Playlists</h2>
                  <div className="playlists-container">
                    {result.playlists.items.map((item) => (
                      <PlaylistItem
                        viewType={"grid"}
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        owner={item.owner}
                        image={item.image}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
};
