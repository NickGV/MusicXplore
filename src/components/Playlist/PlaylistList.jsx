import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";
import { PlaylistItem } from "./PlaylistItem";
import './PlaylistList.css'

export const PlaylistList = () => {
  const {  playlists,  } =
    useContext(MusicContext);
  return (
    <section className="playlists-section">
    <h1 className="playlsits__title">Playlists</h1>
      {playlists && (
        <div className="playlists">
          {playlists.map((item) => (
            <PlaylistItem
              viewType={"grid"}
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
    </section>
  );
};
