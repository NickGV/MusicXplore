import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AudioPlayer } from "./components/AudioPlayer/AudioPlayer";
import { NavBar } from "./components/NavBar/NavBar";
import { Queue } from "./components/Queue/Queue";
import { SearchBar } from "./components/Search/SearchBar";
import { Discover } from "./components/Search/Discover";
import { MusicProvider } from "./context/MusicProvider";
import { Favorites } from "./components/Favorites/Favorites";

function App() {
  return (
    <>
      <MusicProvider>
        <header className="header">
          <h1 className="header__title">MusicXplore</h1>
          <SearchBar />
        </header>
        <main className="main">
          <NavBar />

          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>

          <Queue />
        </main>
        <section className="audio-player">
          <AudioPlayer />
        </section>
      </MusicProvider>
    </>
  );
}

export default App;
