import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";
import { SongItem } from "../Song/SongItem";

export const Favorites = () => {
  const { favoriteMusic, setFavoriteMusic } = useContext(MusicContext);

  return (
    <div>
      {favoriteMusic.length === 0 ? (
        <h2 className="text-white-headline text-xl font-bold p-2">
          No hay canciones favoritas
        </h2>
      ) : (
        <div>
          <h2 className="text-white-headline text-xl font-bold p-2">
            Favoritos
          </h2>
          <ul>
            {favoriteMusic.map((music) => (
              <li className="border-b" key={music.id}>
                <SongItem
                  id={music.id}
                  name={music.name}
                  artist={music.artist}
                  image={music.image}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
