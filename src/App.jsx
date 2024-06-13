import "./App.css";
import { AudioPlayer } from "./components/AudioPlayer/AudioPlayer";
import { NavBar } from "./components/NavBar/NavBar";
import { Queue } from "./components/Queue/Queue";
import { SearchBar } from "./components/Search/SearchBar";
import { SearchResults } from "./components/Search/SearchResults";

function App() {
 
  return (
    <>
      <header className="header">
        <h1 className="header__title">MusicXplore</h1>
        <SearchBar />
      </header>
      <main className="main">
        <NavBar />
        <SearchResults />
        <Queue />
      </main>
      <section className="audio-player">
        <AudioPlayer />
      </section>
    </>
  );
}

export default App;
