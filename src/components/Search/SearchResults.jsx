import { useState } from "react";
import { SongItem } from "../Song/SongItem";
import { search } from "../../api/spotifyService";
import "./SearchResults.css";
import { GridView, FormatListBulleted } from "@mui/icons-material";
import { PlaylistItem } from "../Playlist/PlaylistItem";

export const SearchResults = () => {
  const [viewType, setViewType] = useState("list");
  const [results, setResults] = useState(null);
  console.log(results);
  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await search("kballero", "track,playlist");
    setResults(data);
  };

  return (
    <section className="results">
      <div className="results__header">
        <h1 className="results__title" onClick={handleSearch}>
          Results
        </h1>
        <button className="prueba-btn">prueba</button>
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
            <a href="#tracks" onClick={handleSearch}>
              Tracks
            </a>
          </li>
          <span>/</span>
          <li className="results__link">
            <a href="#playlists">Playlist</a>
          </li>
        </ul>
        {results && (
          <div className="results__container">
            <h2 className="result__title">Tracks</h2>
            <div
              className={`songs-container ${
                viewType === "grid" ? "grid" : "list"
              }`}
              id="tracks"
            >
              {results.tracks.items.map((item) => (
                <SongItem
                  viewType={viewType}
                  key={item.id}
                  name={item.name}
                  artists={item.artists}
                  image={item.album.images[0].url}
                />
              ))}
            </div>
            <h2 className="result__title">Playlists</h2>
            <div className="playlists-container" id="playlists">
              {results.playlists.items.map((item) => (
                <PlaylistItem
                  viewType={viewType}
                  key={item.id}
                  name={item.name}
                  owner={item.owner}
                  image={item.images[0].url}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
