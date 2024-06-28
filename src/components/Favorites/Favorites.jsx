import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";
import { SongItem } from "../Song/SongItem";
import "./Favorites.css";

export const Favorites = () => {
  const { favoriteMusic } = useContext(MusicContext);

  return (
    <section className="favorites">
      {favoriteMusic.length === 0 ? (
        <h2 className="favorites__title">No favorite Songs</h2>
      ) : (
        <div>
          <h2 className="favorites__title">Favorites</h2>
          <ul>
            {favoriteMusic.map((music) => (
              <li key={music.id}>
                <SongItem
                  id={music.id}
                  name={music.name}
                  artists={music.artists}
                  image={music.image}
                  preview={music.preview}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
